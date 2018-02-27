function toggleBlock (block) {
    document.querySelector(block).classList.toggle('toggle-block');
}

function hideBlock (block) {
    document.querySelector(block).classList.add('toggle-block');
}

function generateCarsBlock (indexOwner) {
    const parent = document.querySelector('#cars tbody');
    document.querySelector('.form-cars').innerHTML = '';
    parent.innerHTML = '';

    if (document.querySelector('.add-car')) {
        document.querySelector('.add-car').remove();
    }

    if (document.querySelector('.sell-cars')) {
        document.querySelector('.sell-cars').remove();
    }

    cars.map((item, index) => {
        const child = document.createElement('tr'),
              tdActions = document.createElement('td');
        child.setAttribute('data-car', index);

        const brand = new Element('td', item.brand),
              model = new Element('td', item.model),
              year = new Element('td', item.year),
              price = new Element('td', `$ ${item.price}`),
              isNewTrue = new Element('td', 'New'),
              isNewFalse = new Element('td', 'Not new'),
              inputBuy = new ElementBtn('input',{type: 'button', value: 'Buy'}, buy, ['btn', 'btn-warning']),
              inputRemove = new ElementBtn('input', {type: 'button', value: 'Remove car'}, removeCar, ['btn', 'btn-danger']);

        brand.render(child);
        model.render(child);
        year.render(child);
        price.render(child);

        item.isNew ? isNewTrue.render(child) : isNewFalse.render(child);

        if (Number.isInteger(indexOwner)) {
            child.setAttribute('data-owner', indexOwner);
            inputBuy.render(tdActions);
        } else {
            inputRemove.render(tdActions);
        }

        child.appendChild(tdActions);
        parent.appendChild(child);
    });
}

function generateOwnersBlock () {
    let parent = document.querySelector('#owners tbody');
    document.querySelector('.form-cars').innerHTML = '';
    parent.innerHTML = '';

    if (document.querySelector('.sell-cars')) {
        document.querySelector('.sell-cars').remove();
    }

    owners.map((item, index) => {
        const child = document.createElement('tr'),
              tdActions = document.createElement('td');
        child.setAttribute('data-owner', index);

        const name = new Element('td', item.name),
              balance = new Element('td', `$ ${item.balance}`),
              buyCar = new ElementBtn('input', {type: 'button', value: 'Buy car'}, ownerBuy, ['btn', 'btn-warning']),
              sellCar = new ElementBtn('input', {type: 'button', value: 'Sell cars'}, sell, ['btn', 'btn-info']),
              removeOwnerBtn = new ElementBtn('input', {type: 'button', value: 'Remove owner'}, removeOwner, ['btn', 'btn-danger']);

        name.render(child);
        balance.render(child);
        buyCar.render(tdActions);

        if (item.cars.length) {
            let ownerCar = '';
            item.cars.map(item => {
                ownerCar += `${item.brand} ${item.model} ${item.year} $ ${item.price}<br>`;
            });

            const ownerItemTrue = new Element('td', ownerCar);
            ownerItemTrue.render(child);
            sellCar.render(tdActions);
        } else {
            const ownerItemFalse = new Element('td', 'Not cars');
            ownerItemFalse.render(child);
        }

        removeOwnerBtn.render(tdActions);
        child.appendChild(tdActions);
        parent.appendChild(child);
    });
}

function ownerBuy (e) {
    let indexOwner = parseInt(e.target.parentNode.parentNode.getAttribute('data-owner'));
    toggleBlock('#cars');
    toggleBlock('#owners');
    generateCarsBlock(indexOwner);
}

function buy (e) {
    let indexCar = parseInt(e.target.parentNode.parentNode.getAttribute('data-car')),
          indexOwner = parseInt(e.target.parentNode.parentNode.getAttribute('data-owner'));

    if (owners[indexOwner].isEnoughMoney(cars[indexCar].price)) {
        owners[indexOwner].buyCar(cars[indexCar]);
        cars[indexCar].toBeSold();
        cars.splice(indexCar, 1);
    } else {
        alert(`${owners[indexOwner].name} is not many on the ${cars[indexCar].brand} ${cars[indexCar].model}!`);
    }

    toggleBlock('#cars');
    toggleBlock('#owners');
    generateOwnersBlock();
}

function sell (e) {
    let indexOwner = parseInt(e.target.parentNode.parentNode.getAttribute('data-owner'));
    owners[indexOwner].selectSellCar(indexOwner);
}

function cancelSellCar () {
    document.querySelector('.sell-cars').remove();
    toggleBlock('#owners');
}

function btnSell (e) {
    const indexCar = e.target.getAttribute('dataSellCar'),
          indexOwner = e.target.getAttribute('dataSellOwner');

    owners[indexOwner].sellCar(indexCar);
    document.querySelector('.sell-cars').remove();
    generateOwnersBlock();
    toggleBlock('#owners');
}

function removeCar (e) {
    const indexCar = e.target.parentNode.parentNode.getAttribute('data-car');

    if (confirm(`Remove ${cars[indexCar].brand} ${cars[indexCar].model}`)) {
        Car.removeCar(indexCar);
    }

    generateCarsBlock();
}

function removeOwner (e) {
    const indexOwner = e.target.parentNode.parentNode.getAttribute('data-owner');

    if (confirm(`Remove ${owners[indexOwner].name}`)) {
        Owner.removeOwner(indexOwner);
    }

    generateOwnersBlock();
}
