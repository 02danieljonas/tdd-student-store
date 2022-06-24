import * as React from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    // let shoppingCart = [];
    const [shoppingCart, setShoppingCart] = useState([]);

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
        setShoppingCart([...shoppingCart]);
    };
    const handleRemoveItemFromCart = (productId) => {
        shoppingCart.forEach((e, index, arr) => {
            if (productId == e.itemId) {
                if (e.quantity > 0) {
                    e.quantity -= 1;
                }
                if (e.quantity == 0) {
                    arr.splice(index, index + 1);
                }
            }
        });
        setShoppingCart([...shoppingCart]);
    };

    const handleOnCheckoutFormChange = (whichInput, value) => {
        //.maybe use a useState to set the values of name or email to allow passage to backend
        console.log("checkout form changed", whichInput, value);
    };
    const handleOnSubmitCheckoutForm = ({ shoppingCart }) => {
        console.log(shoppingCart);
        axios
            .post("http://localhost:3001/store/", {
                user: {
                    email: "mail@mail.com",
                    name: "Joe",
                },
                shoppingcart: [
                    {
                        itemId: 1,
                        quantity: 2,
                    },
                    {
                        itemId: 2,
                        quantity: 1,
                    },
                    {
                        itemId: 3,
                        quantity: 1,
                    },
                ],
            })
            .then((res) => {
                console.log(res);
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
                        // checkoutForm={checkoutForm}
                        handleOnCheckoutFormChange={handleOnCheckoutFormChange}
                        handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm}
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
