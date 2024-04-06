import { useState, useEffect } from "react";

export const SearchingComponent = ({products, setUserSelect, setPreventAuto, setSearchProducts}) => {

    const [category, setCategory] = useState([]);
    const [searchCategory, setSearchCategory] = useState();
    const [searchText, setSearchText] = useState('');

    // This useEffect is for better searching user experience
    useEffect(() => {
        const newNames = products.map(product => product.title);
        const newCategories = products.reduce((acc, product) => {
            if(!acc.includes(product.category))
                    acc.push(product.category);
            return acc;
            }, []);
    
        setCategory(newCategories);
    }, [products]);
    
    function searchProduct(query) {
        return fetch(`https://dummyjson.com/products/search?q=${query}`)
          .then(res => res.json())
          .then(data => {
            setSearchProducts(data.products);
        });
    }

    return(
        <div className='main-searchBar'>
            <form className='searchBar' onSubmit={(e)=>{
                searchProduct(searchText);
                e.preventDefault();
                setPreventAuto(true);
                setUserSelect(null);}}>
                <select value={searchCategory} onChange={e => setSearchCategory(e.target.value)}>
                    <option value="ALL">ALL</option>
                    {category.map((categories) => (
                    <option value={categories} key={categories}>{categories}</option>
                    ))}
                </select>
                <input type='text' placeholder='Enter name or category...' value={searchText} onChange={e => setSearchText(e.target.value)}/>
            </form>  
        </div>
    );
};