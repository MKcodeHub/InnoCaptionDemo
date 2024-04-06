export const CartList = ({cart, handleQuantity, handleRemove, handleCheckList, checkLists}) => {
    return (
        <section className="cartList">
            <div className="cartList-wrap">
                <input type="checkbox" 
                    onChange={(e) => {
                        handleCheckList(e.currentTarget.checked, cart.id);
                    }}
                    checked={checkLists.includes(cart.id) ? true:false}
                />
                <div className="cartList-image-info">
                    <div className="cartList-image">
                        <img className="productImg" src={cart.image} />
                    </div>
                    <div className="cart-productInfo">
                        <p className="brand">{cart.brand}</p>
                        <p className="title">{cart.title}</p>
                        <p className="price">$ {cart.price}</p>
                        <p className="delivery">free shipping</p>
                    </div>
                </div>
                <div className="cartList-count">
                    <button className="leftBtn" onClick={() => handleQuantity("minus", cart.id, cart.quantity-1)}>-</button>


                    <span>{cart.quantity}</span>

                    <button className="rightBtn" onClick={() => handleQuantity("plus", cart.id, cart.quantity+1)}>+</button>
  
                </div>
                <div className="remove" onClick={() =>handleRemove(cart.id)}>
                        <button className="remove-btn">X</button>
                </div>
                <div className="buynow">
                    <p>$ {cart.price * cart.quantity}</p>
                </div>
            </div>
        </section>
    );
};