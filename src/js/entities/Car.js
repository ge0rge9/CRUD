class Car {
    constructor (brand, model, year, price) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.price = price;
        this.isNew = true;
    }

    static removeCar (index) {
        cars.splice(index, 1);
    }

    changePriceIfNotNew () {
        this.price = parseInt(this.price * 0.7);
    }

    toBeSold () {
        this.isNew = false;
        this.changePriceIfNotNew();
    }

}