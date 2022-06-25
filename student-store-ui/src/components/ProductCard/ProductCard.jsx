import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const ProductCard = ({
    product,
    productId,
    quantity,
    handleAddItemToCart,
    handleRemoveItemFromCart,
    showDescription,
    searchValue,
    category,
    // sho
}) => {
    // const [amount, setAmount] = useState(quantity);
    return (
        <div
            className={`product-card ${
                product.name.toLowerCase().includes(searchValue.toLowerCase())
                    ? ""
                    : "hidden"
            }
            ${
                category == "All"
                    ? ""
                    : product.category
                          .toLowerCase()
                          .includes(category.toLowerCase())
                    ? ""
                    : "hidden"
            }
            `}
        >
            <span className="media">
                <Link to={{ pathname: "/products/" + productId }}>
                    <img src={product.image} />
                </Link>
            </span>
            <div className="product-info">
                {" "}
                <span className="product-name">{product.name}</span>
                <br />
                <br />
                <span className="quantity-price-container">
                    <span className="quantity-modifer">
                        <button
                            className="add"
                            onClick={() => {
                                // handleAddItemToCart(productId);
                                handleAddItemToCart(productId);
                            }}
                        >
                            +
                        </button>
                        <span className="product-quantity"> {quantity} </span>
                        <button
                            className="remove"
                            onClick={() => {
                                // handleRemoveItemFromCart(productId);
                                handleRemoveItemFromCart(productId);
                                // if (amount > 0) setAmount(amount - 1);
                            }}
                        >
                            -
                        </button>
                    </span>
                    <span className="product-price">
                        ${product.price.toFixed(2)}{" "}
                    </span>
                </span>
                {showDescription ? (
                    <span className="product-description"></span>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
