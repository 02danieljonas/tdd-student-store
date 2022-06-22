import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
// import db from "../../../../student-store-express-api/data/db.json";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useEffect } from "react";

const ProductDetail = ({ products }) => {
    let productId = useParams().productId;
    let product = products[productId - 1];
    return (
        <div className="product-container">
            <h1 className="product-name">{product.name}</h1>
            <img src={product.image} />
            {product.description}
            <br />${product.price.toFixed(2)}
        </div>
    );
};

export default function App() {
    const [products, setProducts] = useState([]);
    const getData = () => {
        axios
            .get("https://codepath-store-api.herokuapp.com/store")
            .then(({ data }) => {
                setProducts(data.products);
            })
            .catch((data) => {
                console.error("Error with loading data", data);
            });
    };
    React.useEffect(() => {
        getData();
    }, []);

    const [isFetching, setIsFetching] = useState(false);
    let error;
    let shoppingCart = [];

    const [isOpen, handleOnToggle] = useState(false);

    const handleAddItemToCart = (productId) => {
        let notFound = true;
        shoppingCart.forEach((e) => {
            if (productId == e.itemId) {
                e.quantity += 1;
                notFound = false;
            }
        });
        if (notFound) {
            shoppingCart.push({ itemId: productId, quantity: 1 });
        }
    };
    const handleRemoveItemFromCart = (productId) => {
        let notFound = true;
        shoppingCart.forEach((e) => {
            if (productId == e.itemId) {
                if (e.quantity > 0) e.quantity -= 1;
                notFound = false;
            }
        });
        if (notFound) {
            shoppingCart.push({ itemId: productId, quantity: 1 });
        }
    };

    const handleOnCheckoutFormChange = (props) => {
        console.log("checkout form changed", props.target);
    };
    const handleOnSubmitCheckoutForm = (props) => {
        console.log("checkout form submitted", props.target);
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
                                />
                            }
                        />
                        <Route
                            path="/products/:productId"
                            element={<ProductDetail products={products} />}
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </div>
    );
}
