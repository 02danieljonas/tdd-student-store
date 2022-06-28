import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";
import Contact from "../Contact/Contact";

import ProductDetail from "../ProductDetail/ProductDetail";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function App() {
    const [products, setProducts] = useState([]);
    const [receipt, setReceipt] = useState(null);

    const getData = () => {
        axios
            .get("http://localhost:3001/store")
            // .get("https://codepath-store-api.herokuapp.com/store")
            .then((res) => {
                setProducts(res.data.products);
            })
            .catch((data) => {
                console.error("Error with loading data", data);
            });
        setIsFetching(false);
    };

    const [isFetching, setIsFetching] = useState(true);

    React.useEffect(() => {
        getData();
    }, []);

    let error;
    const [shoppingCart, setShoppingCart] = useState([]);

    const [isOpen, handleOnToggle] = useState(false);

    const handleAddItemToCart = (productId) => {
        if (shoppingCart.some((element) => element.itemId === productId)) {
            const idx = shoppingCart.findIndex(
                (element2) => element2.itemId === productId
            );
            let item = shoppingCart[idx];
            item.quantity++;
            setShoppingCart([
                ...shoppingCart.slice(0, idx),
                item,
                ...shoppingCart.slice(idx + 1, shoppingCart.length),
            ]);
        } else {
            setShoppingCart((shoppingCart) => [
                ...shoppingCart,
                { itemId: productId, quantity: 1 },
            ]);
        }
    };

    const handleRemoveItemFromCart = (productId) => {
        let amount = 0;
        shoppingCart.forEach((e, index, arr) => {
            if (productId == e.itemId) {
                if (e.quantity > 0) {
                    e.quantity -= 1;
                    amount = e.quantity;
                }
                if (e.quantity == 0) {
                    arr.splice(index, index + 1);
                }
            }
        });
        setShoppingCart([...shoppingCart]);
        return amount;
    };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [missingFormData, setMissingFormData] = useState(null);

    const handleOnCheckoutFormChange = (whichInput, value) => {
        if (whichInput == "name") {
            setName(value);
        } else if (whichInput == "email") {
            setEmail(value);
        } else {
            console.error(
                "please provide name or email to handleOnCheckoutFormChange"
            );
        }
    };
    const handleOnSubmitCheckoutForm = ({ shoppingCart }) => {
        if (!name) {
            console.log("Name is empty");
            setMissingFormData("name");
            return;
        }
        if (!email) {
            console.log("Email is empty");
            setMissingFormData("email");
            return;
        }
        if (shoppingCart.length == 0) {
            console.log("ShoppingCart is empty");
            setMissingFormData("shoppingcart");
            return;
        }
        setShoppingCart([]);

        axios
            .post("http://localhost:3001/store/", {
                user: {
                    email: email,
                    name: name,
                },
                shoppingcart: shoppingCart,
            })
            .then((res) => {
                setReceipt(
                    `Thank you ${res.data.purchase.name} 
                    for your purchase totalling
                    $${res.data.purchase.total}.
                    We have sent a confirmation email to ${res.data.purchase.email}.
                    Your purchase has been timestamp for ${res.data.purchase.createdAt}`
                );
            })
            .catch(() => {
                console.log("An error occured with posting data");
            });
    };

    return (
        <div className="app">
            <BrowserRouter>
                <main>
                    <Navbar />
                    <Sidebar
                        isOpen={isOpen}
                        products={products}
                        handleOnToggle={handleOnToggle}
                        shoppingCart={shoppingCart}
                        handleOnCheckoutFormChange={handleOnCheckoutFormChange}
                        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
                        receipt={receipt}
                        setReceipt={setReceipt}
                    />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    products={products}
                                    handleAddItemToCart={handleAddItemToCart}
                                    handleRemoveItemFromCart={
                                        handleRemoveItemFromCart
                                    }
                                    shoppingCart={shoppingCart}
                                />
                            }
                        />
                        <Route
                            path="/products/:productId"
                            element={<ProductDetail products={products} />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                    <AboutMe/>
                    <Footer/>
                    <Contact/>
                </main>
            </BrowserRouter>
        </div>
    );
}
