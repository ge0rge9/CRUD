class Person extends Owner {
    constructor (firstName, lastName, balance) {
        super();

        this.balance = balance;
        this.name = `${firstName} ${lastName}`;
        this.cars = [];
    }
}
