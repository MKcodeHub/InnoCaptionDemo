import './detailPage.css';
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const DetailPage = ({cart, setCart, userSelect, setUserSelect}) => {  
    let { itemId } = useParams(); // take product ID as parameter
    const [product, setProduct2] = useState({});
    const [count, setCount] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {        
        fetch(`https://dummyjson.com/products/${itemId}`)
          .then(res => res.json())
          .then(data => {
            setProduct2(data);
            setSelectedImage(data.thumbnail);
        });
    }, [itemId]);
    
    const handleQuantity = (type) => {
        if (type === "plus") {
             setCount(count + 1);
        } else {
            if (count === 1) return;
            setCount(count - 1);
        }
    }

    const handleCart = () => {
        fetch('https://dummyjson.com/carts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 1,
                products: [
                {
                    id: 1,
                    quantity: 1,
                },
                {
                    id: 50,
                    quantity: 2,
                },
                ]
            })
            })
            .then(res => res.json())
            .then(() => {
                //successfully call API
                const cartItem = {
                    id: product.id,
                    image: product.thumbnail,
                    title: product.title,
                    price: product.price,
                    brand: product.brand,
                    discount: product.discountPercentage,
                    quantity: count,
                };
                const found = cart.find((el) => el.id === cartItem.id);
                if (found) handleOverlaps(cartItem.id, found.quantity + count);
                else setCart([...cart, cartItem]);
            });
    }

    const handleOverlaps = (id,quantity) => {
        //adding new items into the existing cart
        fetch('https://dummyjson.com/carts/1', {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                merge: true, // this will include existing products in the cart
                products: [
                {
                    id: 1,
                    quantity: 1,
                },
                ]
            })
            })
            .then(res => res.json())
            .then(() => {
                //successfully call API
                const found = cart.filter((el) => el.id === id)[0];
                const idx = cart.indexOf(found);
                const cartItem = {
                    id: product.id,
                    image: product.image,
                    title: product.title,
                    price: product.price,
                    brand: product.brand,
                    discount: product.discountPercentage,
                    quantity: quantity, //only this part will change
                };
                setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx+1)]);
            });
    }
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

    function isInStock(stock) {
        if (10 >= stock)
            return "Almost Out of Stock"
        else 
            return "In Stock"
    }  

    return (
        product && (
        <div className='detailPage'>
            <div className='image-list'>
                <div className='image-first'>
                    <img src={selectedImage}></img>
                </div>
                <div className='iamge-selection'>
                    {product.images?.map((image, index) => (
                    <img className='images' key={index} src={image}
                        onClick={() => setSelectedImage(image)}/>
                    ))}
                </div>
            </div>
            <p className='brand'> {product.brand} </p>
            <p className='title'> {product.title}</p>
            <p className='description'> {product.description}</p>
            <p className='starRating'> {renderRating(product.rating)} {product.rating}</p>
            <p className='price'>$ {product.price}</p>
            <span className='discount'>- {product.discountPercentage}%</span>
            <p className='stock'>{isInStock(product.stock)}</p>

            <div className='amount'>
                <button className='leftBtn' onClick={() => handleQuantity("minus")}>-</button>
                <span>{count}</span>
                <button className='rightBtn' onClick={() => handleQuantity("plus")}>+</button>           
            </div>
            <div className='sum'>
                <div>
                    <span className='sum-price'>TotalPrice</span>
                </div>
                <div className='sum-total'>
                    <div className='count'>
                        Total: <span className='countNum'>{count}</span>
                    </div>
                    <span className='price'>
                        <span className='unit'>$</span>
                        {product.price * count} 
                    </span>
                </div>
            </div>

            <div className='decision'>
                <button className='buy'>Buy Now</button>
                <button className='addToCart' onClick={handleCart}>Add to cart</button>
            </div>
            <Link to="/"><p onClick={setUserSelect(true)} className='backToHome'>Continue Shopping</p></Link>
        </div>
        )
    );
};

export default DetailPage;