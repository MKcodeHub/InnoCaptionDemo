import { useEffect } from "react"

export const TotalCart = ({cart, total, setTotal, found}) => {

    useEffect(() =>{
        if(found) {
            const sum = found.map((item) => item[0].price * item[0].quantity);
            const reducer = (acc,cur) => acc + cur;
            if(sum.length === 0) {
                setTotal(0);
                return;
            }
            const itemTotal = sum.reduce(reducer);
            setTotal(itemTotal);
        } else {
            setTotal(0);
        }
    }, [cart, total, found, setTotal]); //keep running depends on changes

    return(
        <div className="total">
            <div className="total-price">
                <p>Total Price: </p>
                <p className="price"> ${total}</p>
            </div>
            <div className="image-minus">
                <p>-</p>
            </div>
            <div className="total-discount">
                <p>Total Discount: </p>
                <p className="discount"> %</p>
            </div>
            <div className="image-plus">
                <p>+</p>
            </div>
            <div className="total-delivery"> 
                <p>Delivery Fee: </p>
                <p className="delivery">$5</p>
            </div>

            <div className="total-payment">
                <p>Estimated Payment: </p>
                <p className="totalPrice"> ${total + 5}</p>
            </div>
        </div>
    )
}