class Company extends Owner {
    constructor (name, balance) {
        super();

        this.name = `${name}&#174;`;
        this.balance = balance;
        this.cars = [];
    }
}
