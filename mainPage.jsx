import './mainPage.css'
import { useEffect, useState } from "react";
import ProductList from './productList'
import { SearchingComponent } from './searchingComponent';
import { Link } from 'react-router-dom';

function MainPage ({products , setProducts , userSelect, setUserSelect}) {

    useEffect(() => {        
        fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            setProducts(data.products); //save data from fetching
        })
    }, []); //run it once
    
    const [preventAuto, setPreventAuto] = useState(null);
    const [searchProducts, setSearchProducts] = useState([]);
    
    return(
        <div className='mainBody'>
            <div className='main-title-searchBar'>
            <Link to="/">
                <div className='main-title'> 
                    <img src='https://assets-global.website-files.com/655d1528a0b32e81e04f3276/6589c9f111194170451f72b7_Standard%2BLogo%2B-%2BBlue%2B(RGB).png' />
                </div>
            </Link>
                <SearchingComponent products={products} setUserSelect = {setUserSelect} setPreventAuto ={setPreventAuto} setSearchProducts = {setSearchProducts}/>

                <div className='main-viewMore'>
                    <button className='viewMore-btn' onClick={e => {setUserSelect(true)}}>view all available products</button>
                </div>  
            </div>
            {
                userSelect === true ?
                //check user wants to 
                //1. see available items list
                <div className='main-productList'>
                    <h1>A list of purchasable products</h1>
                    {products && <ProductList products={products}/>}
                </div>
                :
                //2. see searching result
                <div className='main-searchResult'>
                    {products && preventAuto && <ProductList products={searchProducts}/>}
                </div>
            }
        </div>
    )
}

export default MainPage;