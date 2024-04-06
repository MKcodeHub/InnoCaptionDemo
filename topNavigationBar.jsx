import './topNavigationBar.css'
import {Link} from "react-router-dom"
import { SearchingComponent } from './searchingComponent';

export const TopNavigationBar = ({cart}) => {
    return(
        <header className="NavigationHeader">
            <div className="inner">
                <Link to="/">
                    <h1 className="logo">
                        <img src="https://pbs.twimg.com/profile_images/1299058532063604736/ibnyapuS_200x200.png" />
                    </h1>
                </Link>
                <div className="input">
                </div>
            </div>

            <div className="menu">
                <Link to="/cart">
                    <div className="shopping-cart">
                        <img src='https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png'/>
                        {cart.length >= 1 ? (
                            <div className="new-shopping-cart">
                                <p>{cart.length}</p>
                            </div>
                        ) : ("")}
                    </div>
                </Link>
                
            </div>
        </header>
    );
};