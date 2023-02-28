import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Bakery from './Bakery_components/Bakery';
import Dairy from './Dairy_components/Dairy';
import FruitAndVeg from './Fruit_Veg_components/FruitAndVeg';
import MeatAndSeafood from './Meat_Seafood_components/MeatAndSeafood';

function Products() {
    return (
        <div className="App">
          <Routes>
            <Route path="/products/bakery" element={ <Bakery/> } />
            <Route path="/products/meat_seafood" element={ <MeatAndSeafood/> } />
            <Route path="/products/dairy" element={ <Dairy/> } />
            <Route path="/products/fruit_vegetables" element={ <FruitAndVeg/> } />
          </Routes>
        </div>
      );
    }

export default Products;