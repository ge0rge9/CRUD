class Owner {

    static removeOwner (indexOwner) {
        owners.splice(indexOwner, 1);
    }

    sellCar (index) {
        this.balance += this.cars[index].price;
        this.cars[index].price = parseInt(this.cars[index].price / 0.85);
        cars.push(this.cars[index]);
        this.cars.splice(index, 1);
    }

    selectSellCar (index) {
        const indexOwner = index,
              div = document.createElement('div'),
              sellCar = new Element('h4', 'Want to sell car?'),
              btnCansel = new ElementBtn('input',{type: 'button', value: 'Cancel'}, cancelSellCar, ['btn', 'btn-danger', 'btn-block']);
        div.classList.add('form-group', 'sell-cars');

        toggleBlock('#owners');
        sellCar.render(div);

        owners[indexOwner].cars.map((item, index) => {
            this.btn = new ElementBtn('input',{type: 'button', value: `"${item.brand} ${item.model}" $${item.price}`, dataSellCar: index, dataSellOwner: indexOwner},btnSell, ['btn', 'btn-warning', 'btn-sell']);
            this.btn.render(div);
        });

        btnCansel.render(div);
        document.querySelector('.info').appendChild(div);
    }

    buyCar (car) {
        this.cars.push(car);
        this.balance -= car.price;
    }

    isEnoughMoney (carPrice) {
        return this.balance >= carPrice;
    }

}
