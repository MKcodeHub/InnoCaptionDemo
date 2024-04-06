import { CartHeader } from "./cartHeader";
import { CartList } from "./cartList";
import { TotalCart } from "./totalCart";
import './cartModule.css'
import { useState } from "react";

export const Cart = ({cart, setCart, checkLists, setCheckLists}) => {
    const [total, setTotal] = useState(0);
    const handleQuantity = (type, id, quantity) => {
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
                    id: found.id,
                    image: found.image,
                    title: found.title,
                    price: found.price,
                    brand: found.brand,
                    discount: found.discount,
                    quantity: quantity, //only this part will change
                };
                if(type === "plus")
                    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx+1)]);
                else {
                    if (quantity === 0) return;
                    setCart([...cart.slice(0, idx), cartItem, ...cart.slice(idx+1)]);
                }
            });
    };

    const handleRemove = (id) => {
        fetch('https://dummyjson.com/carts/1', {
            method: 'DELETE',
            })
            .then(res => res.json())
            .then(() => {
                //successfully call API
                setCart(cart.filter((el) => el.id !== id));
                setCheckLists(checkLists.filter((check) => check !== id));
            });
    };

    const handleCheckList = (checked, id) => {
        if(checked)
            setCheckLists([...checkLists, id])
        else 
            setCheckLists(checkLists.filter((check) => check !== id))
    };

    const handleAllChecked = (checked) => {
        if(checked) {
            const checkItem = [];
            cart.map((cart) => checkItem.push(cart.id));
            setCheckLists(checkItem);
        } else {
            setCheckLists([]);
        }
    }

    const isAllChceked = cart.length === checkLists.length && checkLists.length !== 0;

    const found = checkLists.map((checkLists) => 
        cart.filter((el) => el.id === checkLists)
    );

    return (
        <div className='cart'>
            <header className="header">
                <h1>Cart</h1>
            </header>
            <CartHeader handleAllChecked={handleAllChecked} isAllChceked={isAllChceked}/>
            {
            cart.length === 0 ? 
            (
                <div className='nothingOnCart'>
                    <h2>There is nothing on a cart</h2>
                    <p>Please add products on a cart</p>
                </div>
            ) : (  
                cart.map((data) => {
                    return <CartList cart={data}  handleQuantity={handleQuantity} handleRemove={handleRemove} handleCheckList={handleCheckList} checkLists={checkLists}/>;
                })   
            )}
            <TotalCart cart={cart} total={total} setTotal={setTotal} found={found}/>


        </div>
    );
};