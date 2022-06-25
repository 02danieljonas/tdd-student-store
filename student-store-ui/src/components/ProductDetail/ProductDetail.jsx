import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
    let productId = useParams().productId;
    let product = products[productId - 1];
    return (
        <div className="product-detail">
            <h1 className="product-name">{product.name}</h1>
            <img src={product.image} />
            {product.description}
            <br />${product.price.toFixed(2)}
        </div>
    );
};

export default ProductDetail;