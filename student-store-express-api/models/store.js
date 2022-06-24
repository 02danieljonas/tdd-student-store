const dbf = require("../../student-store-express-api/data/db.json");
const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const db = lowDb(new FileSync("data/db.json"));
const { BadRequestError } = require("../utils/errors");

class Store {
    static products() {
        console.log(db.get("products"));
        return { products: db.get("products") };
    }
    static product(Id) {
        let item = {product: db.get("products").find((o) => o.id == Id) }
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
                console.log(e);
                missingInfo = true;
            }
            if (!Object.keys(e).some((key) => key === "quantity")) {
                console.log(e);
                missingInfo = true;
            }
        });
        if (missingInfo) {
            throw new BadRequestError(
                "Please provide an itemId and a quantity for each item"
            );
        }


        let itemId = body.shoppingcart.map((e) => {
            return e.itemId;
        });
        // .find((o) => o.id == Id)
        let products = db.get("products")

        let shoppingcartItems=[]
        itemId.forEach((e)=>{
            shoppingcartItems.push( products.find((o) => o.id == e))
        })
        console.log(Array.isArray(shoppingcartItems))
        let t=[]
        shoppingcartItems[0].forEach((e)=>{
            t.push(e)//TODO this is meant to take the prices and put it into the array ${t}
        })
        return shoppingcartItems


        if (new Set(itemId).size !== itemId.length) {
            throw new BadRequestError("The shoppingcart has a dupped itemId");
        }

        let total = body.shoppingcart.map((e) => {
            return e.itemId;
        });

        let today = new Date();
        // console.log(`today is ${today}`)
        // console.log(typeof `${today}`)
        //. return id, name, email, order, total, createAt
        let purchaseData = {
            name: body.user.name,
            email: body.user.email,
            order: body.shoppingcart,
            total: "Total still needs to be calculated",
            createdAt: today
        };


        let postInfo = { user: body.user, shoppingcart: body.shoppingcart };
        // db.get("purchases").push(postInfo).write();
        return { "purchase": body.shoppingcart };
    }
}

module.exports = Store;
