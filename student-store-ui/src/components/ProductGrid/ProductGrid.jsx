import React from "react";
import "./ProductGrid.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid = ({
    products,
    handleAddItemToCart,
    handleRemoveItemFromCart,
    searchValue,
    category,
    shoppingCart,
}) => {
    return (
        <div className="product-grid">
            {products.map((e, i) => {
                let quantity = shoppingCart.find((ele) => ele.itemId === e.id);
                quantity = quantity ? quantity.quantity : 0;
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
