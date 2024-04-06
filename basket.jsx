import { Cart } from "./cart/cart"

const Basket = ({cart, setCart, checkLists, setCheckLists}) => {
    return <Cart cart={cart} setCart={setCart} checkLists={checkLists} setCheckLists={setCheckLists} />
}

export default Basket;