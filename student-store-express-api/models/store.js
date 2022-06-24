const dbf = require("../../student-store-express-api/data/db.json");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const db = lowDb(new FileSync("data/db.json"));
class Store {
    static products() {
        console.log(db.get("products"));
        return { products: db.get("products") };
    }
    static product(Id) {
        return { product: db.get("products").find((o) => o.id == Id) };
    }
    static post(body) {
        if (!body.user.email || !body.user.name) {
            console.log("Should return a 400");
            return { body: "WRONG" };
        }
        if (
            typeof body.user.email != "string" ||
            typeof body.user.name != "string"
        ) {
            console.log("Should return a 400");
            return { body: "WRONG, make string" };
        }
        if (!Array.isArray(body.shoppingcart)) {
            console.log("Should return a 400");
            return { body: "WRONG, why shoppingcart like that" };
        }
        if (body.shoppingcart.length == 0) {
            console.log("Should return a 400");
            return { body: "Shopping cart should have things" };
        }

        let missingInfo = false;
        body.shoppingcart.forEach((e) => {
            if (!Object.keys(e).some((key) => key === "itemId")) {
                console.log(e);
                missingInfo = true;
            }

            if (!Object.keys(e).some((key) => key === "quantity")) {
                console.log(e);
                missingInfo = true;
            }
        });
        if (missingInfo) {
            console.error("Should return a 400");
            return { body: "Please have both itemId and quantity" };
        }

        let itemId = body.shoppingcart.map((e) => {
            return e.itemId;
        });
        if (new Set(itemId).size !== itemId.length) {
            console.log("Should return a 400");
            return { body: "No dups in shoppingcart" };
        }
        db.get("purchases").push(body).write();
        return { body };
    }
}

module.exports = Store;
