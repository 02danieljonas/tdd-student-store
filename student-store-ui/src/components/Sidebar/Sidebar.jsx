import * as React from "react";
import "./Sidebar.css";
import arrow from "./arrow.svg";
import shoppingCartSVG from "./shoppingcart.svg";
import check from "./check.svg";
import coin from "./coin.svg";
import { useState } from "react";

export default function Sidebar({
    isOpen,
    handleOnToggle,
    shoppingCart,
    products,
    checkoutForm,
    handleOnCheckoutFormChange,
    handleOnSubmitCheckoutForm,
}) {
    return (
        <section className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div>
                <button
                    className="toggle-button"
                    onClick={() => {
                        handleOnToggle(!isOpen);
                    }}
                >
                    <img id="arrow" src={arrow} alt="arrow" width={40} />
                </button>
            </div>
            <br />
            <div id="shopping-cart">
                <div className="icon">
                    {isOpen ? <h3>Shopping Cart</h3> : <></>}
                    <button
                        className="toggle-button"
                        onClick={() => {
                            handleOnToggle(true);
                        }}
                    >
                        <img
                            src={shoppingCartSVG}
                            alt="shoppingcart"
                            width={40}
                        />
                    </button>
                </div>
                <table className={isOpen ? "" : "hidden"}>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Cost</th>
                        </tr>
                        <tr>
                            <td>Cinnamon Rolls</td>
                            <td>2</td>
                            <td>$2.99</td>
                            <td>$5.98</td>
                        </tr>
                        <tr>
                            <td>Bar Code Shirts</td>
                            <td>8</td>
                            <td>$19.99</td>
                            <td>$39.98</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                {isOpen ? <h3>Payment Info</h3> : <></>}
                <button
                    className="toggle-button"
                    onClick={() => {
                        handleOnToggle(true);
                    }}
                >
                    <img src={coin} alt="coin" width={40} />
                </button>
            </div>
            <div>
                {isOpen ? <h3>Checkout Info</h3> : <></>}

                <button
                    className="toggle-button"
                    onClick={() => {
                        handleOnToggle(true);
                    }}
                >
                    <img src={check} alt="check" width={40} />
                </button>
            </div>
        </section>
    );
}
