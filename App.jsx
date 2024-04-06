import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import MainPage from './mainPage';
import DetailPage from './detailPage';
import {TopNavigationBar} from './topNavigationBar';
import Basket from './basket';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [checkLists, setCheckLists] = useState([]);
  const [userSelect, setUserSelect] = useState(null);

  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart}/>
      <div style={{marginTop: '60px'}}>
        <Routes>
          <Route path="/" element={<MainPage products={products} setProducts={setProducts} userSelect={userSelect} setUserSelect={setUserSelect}/>} />
          <Route path="/product-detail/:itemId" element={<DetailPage cart={cart} setCart={setCart} userSelect={userSelect} setUserSelect={setUserSelect}/>} />
          <Route path='/cart' element={<Basket cart={cart} setCart={setCart} checkLists={checkLists} setCheckLists={setCheckLists}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
