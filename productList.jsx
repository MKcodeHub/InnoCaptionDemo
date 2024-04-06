import './productList.css'
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
    function renderRating(rating) {
        let ratingStars = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= rating)
                ratingStars += "★";
            else 
                ratingStars += "☆";
        }
        return ratingStars;
    }
    
    return(
            <div className='productList'>
                {products.map((product) => (
                    <Link to={`/product-detail/${product.id}`} className='result-item' key={product.id}>
                        <img src={product.thumbnail} alt={product.title}/>
                        <h2>{product.brand}</h2>
                        <h2 className='title'>{product.title}</h2>
                        <h3 className='starRatinig'>{renderRating(product.rating)} {product.rating}</h3>
                        <h4><span>$ </span>{product.price}</h4>
                        <span className='stock'>{product.stock} left</span>
                    </Link>
                ))}
            </div>        
    );
}
export default ProductList;