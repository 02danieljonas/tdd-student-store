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
    const total = shoppingCart
        .map((e) => products.find((o) => o.id == e.itemId).price * e.quantity)
        .reduce((a, b) => a + b, 0);
    // console.log(shoppingCart);

    return (
        <section className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <div>
                <button
                    className="toggle-button svg"
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
                        className="shopping-button svg"
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
                {shoppingCart.length != 0 ? (
                    <table className={isOpen ? "" : "hidden"}>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Unit Price</th>
                                <th>Cost</th>
                            </tr>
                            {shoppingCart.map((e) => (
                                <tr key={`${e.itemId}tr`}>
                                    <td key={`${e.itemId} ID`}>
                                        {products.find((o) => o.id == e.itemId)
                                            ? products.find(
                                                  (o) => o.id == e.itemId
                                              ).name
                                            : ""}
                                    </td>
                                    <td key={`${e.itemId} quantity`}>
                                        {e.quantity}
                                    </td>
                                    <td>
                                        $
                                        {products.find((o) => o.id == e.itemId)
                                            ? products
                                                  .find((o) => o.id == e.itemId)
                                                  .price.toFixed(2)
                                            : ""}
                                    </td>
                                    <td key={`${e.itemId} total cost`}>
                                        $
                                        {products.find((o) => o.id == e.itemId)
                                            ? (
                                                  products.find(
                                                      (o) => o.id == e.itemId
                                                  ).price * e.quantity
                                              ).toFixed(2)
                                            : ""}
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td>Subtotal</td>
                                <td></td>
                                <td></td>
                                <td>${total.toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Taxes and Fees</td>
                                <td></td>
                                <td></td>
                                <td>${(total * 0.0875).toFixed(2)}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td></td>
                                <td></td>
                                <td>${(total * 1.0875).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <h5 className={isOpen ? "" : "hidden"}>
                        No items added to cart yet.
                    </h5>
                )}
            </div>

            <div>
                {isOpen ? <h3>Payment Info</h3> : <></>}
                <button
                    className="payment-button svg"
                    onClick={() => {
                        handleOnToggle(true);
                    }}
                >
                    <img src={coin} alt="coin" width={40} />
                </button>
            </div>

            {isOpen ? (
                <div id="form">
                    <label htmlFor="name">Name:</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Student Name"
                        onChange={({target})=>{
                            handleOnCheckoutFormChange("name", target.value)
                        }}
                    ></input>
                    <br />
                    <label htmlFor="email">Email:</label>
                    <br />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="student@codepath.org"
                        onChange={({target})=>{
                            handleOnCheckoutFormChange("email", target.value)
                        }}
                    ></input>
                    <br />
                    <div>
                        {" "}
                        <button
                            onClick={()=>{handleOnSubmitCheckoutForm(shoppingCart={shoppingCart})}}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div>
                <div>
                    {isOpen ? <h3>Checkout Info</h3> : <></>}

                    <button
                        className="checkout-button svg"
                        onClick={() => {
                            handleOnToggle(true);
                        }}
                    >
                        <img src={check} alt="check" width={40} />
                    </button>
                </div>
                {isOpen ? (
                    <div id="confirmation">
                        <h4 id="wrap">
                            A confirmation email will be sent to you so that you
                            can confirm this order. Once you have confirmed the
                            order, it will be delivered to your dorm room.
                        </h4>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </section>
    );
}
