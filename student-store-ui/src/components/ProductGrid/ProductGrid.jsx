import React from "react";
import "./ProductGrid.css";
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
}) => {
    const [amount, setAmount] = useState(quantity);
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
                <Link
                    to={{ pathname: "/products/" + productId }}
                    // id={productId}
                    // info={product}
                >
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
                                handleAddItemToCart(productId);
                                setAmount(amount + 1);
                            }}
                        >
                            +
                        </button>
                        <span className="product-quantity"> {amount} </span>
                        <button
                            className="remove"
                            onClick={() => {
                                handleRemoveItemFromCart(productId);
                                if (amount > 0) setAmount(amount - 1);
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

const ProductGrid = ({
    products,
    handleAddItemToCart,
    handleRemoveItemFromCart,
    quantity = 0,
    searchValue,
    category,
}) => {
    return (
        <div className="product-grid">
            {products.map((e, i) => {
                return (
                    <ProductCard
                        product={e}
                        key={i}
                        productId={e.id}
                        showDescription={false}
                        handleAddItemToCart={handleAddItemToCart}
                        handleRemoveItemFromCart={handleRemoveItemFromCart}
                        quantity={quantity}
                        searchValue={searchValue}
                        category={category}
                    />
                );
            })}
        </div>
    );
};

export default ProductGrid;
