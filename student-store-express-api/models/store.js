const db = require("../../student-store-express-api/data/db.json")

class Store {
    static products() {
        return db
    }
    static product(Id) {
        return db.products.find((o) => o.id == Id)
    }
}

module.exports = Store;
