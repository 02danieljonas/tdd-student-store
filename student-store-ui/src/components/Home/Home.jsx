import * as React from "react";
import "./Home.css";
import Hero from "../Hero/Hero";
import ProductGrid from "../ProductGrid/ProductGrid.jsx";
import { useState, useEffect } from "react";

const Search = ({ setSearchValue, setCategory, category }) => {
    return (
        <>
            <span className="product-search">
                <input
                    type="search"
                    id="site-search"
                    name="search site's products"
                    className="input-search"
                    onInput={(e) => {
                        setSearchValue(e.target.value);
                    }}
                />
            </span>
            <span className="product-category">
                <button
                    onClick={() => {
                        setCategory("All");
                    }}
                    className={category=="All"?"choosen-button":""}
                >
                    All Categories
                </button>
                <button
                    onClick={() => {
                        setCategory("Clothing");
                    }}
                    className={category=="Clothing"?"choosen-button":""}
                >
                    Clothing
                </button>
                <button
                    onClick={() => {
                        setCategory("Food");
                    }}
                    className={category=="Food"?"choosen-button":""}
                >
                    Food
                </button>
                <button
                    onClick={() => {
                        setCategory("Accessories");
                    }}
                    className={category=="Accessories"?"choosen-button":""}
                >
                    Accessories
                </button>
                <button
                    onClick={() => {
                        setCategory("Tech");
                    }}
                    className={category=="Tech"?"choosen-button":""}
                >
                    Tech
                </button>
            </span>
        </>
    );
};

function Home({ products, handleAddItemToCart, handleRemoveItemFromCart }) {
    const [searchValue, setSearchValue] = useState("");
    const [category, setCategory] = useState("All");
    return (
        <div className="home">
            <Hero />
            <Search
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setCategory={setCategory}
                category={category}
            />
            <ProductGrid
                products={products}
                handleAddItemToCart={handleAddItemToCart}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                searchValue={searchValue}
                category={category}
            />
            <p>Home</p>
        </div>
    );
}

export default Home;
