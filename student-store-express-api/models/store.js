const dbf = require("../../student-store-express-api/data/db.json");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const db = lowDb(new FileSync("data/db.json"));
const { BadRequestError } = require("../utils/errors");

class Store {
    static products() {
        // console.log(db.get("products"));
        return { products: db.get("products") };
    }
    static product(Id) {
        let item = { product: db.get("products").find((o) => o.id == Id) };
        // console.log(item)
        return item;
    }
    static post(body) {
        if (!body.user.email || !body.user.name) {
            throw new BadRequestError(
                "Names and Email Field are missing in action"
            );
        } else if (
            typeof body.user.email != "string" ||
            typeof body.user.name != "string"
        ) {
            throw new BadRequestError(
                "The Email and Name fields should be a string"
            );
        }
        if (!Array.isArray(body.shoppingcart)) {
            throw new BadRequestError("Shoppingcart should be an array");
        }
        if (body.shoppingcart.length == 0) {
            throw new BadRequestError("Shoppingcart should not be empty");
        }

        let missingInfo = false;
        body.shoppingcart.forEach((e) => {
            if (!Object.keys(e).some((key) => key === "itemId")) {
                console.error(e);
                missingInfo = true;
            }
            if (!Object.keys(e).some((key) => key === "quantity")) {
                console.error(e);
                missingInfo = true;
            }
        });
        if (missingInfo) {
            throw new BadRequestError(
                "Please provide an itemId and a quantity for each item"
            );
        }
        let products = db.get("products");

        ///* This is ALOT of code and there is most likely an easier way to write this but I don't have time to figure it out *///

        let itemId = body.shoppingcart.map((e) => {
            return e.itemId;
        });
        let quantity = body.shoppingcart.map((e) => {
            return e.quantity;
        });
        let shoppingcartItems = [];
        itemId.forEach((e) => {
            shoppingcartItems.push(products.find((o) => o.id == e));
        }); //this pushes in the item
        let prices = [];
        shoppingcartItems.forEach((e, idx) => {
            prices.push(e.value().price * quantity[idx]);
        });
        let sum = 0;
        prices.forEach((e) => {
            sum += e;
        });

        if (new Set(itemId).size !== itemId.length) {
            throw new BadRequestError(
                "The shoppingcart has a duplicate itemId"
            );
        }

        let today = new Date();
        let purchaseData = {
            purchase: {
                name: body.user.name,
                email: body.user.email,
                order: body.shoppingcart,
                total: (sum * 1.0875).toFixed(2),
                createdAt: today,
            },
        };
        let postInfo = { user: body.user, shoppingcart: body.shoppingcart };
        db.get("purchases").push(purchaseData).write();
        return purchaseData;
    }
}

module.exports = Store;
