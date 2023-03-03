import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import ProductDetails from './ProductDetails';

import Bakery from './bakery_components/Bakery';
import BreadProducts from './bakery_components/subcats/Bread';
import DessertProducts from './bakery_components/subcats/Desserts';
import GlutenFreeVeganProducts from './bakery_components/subcats/GlutenFreeVegan';
import SavoryProducts from './bakery_components/subcats/Savory';
import SeasonalProducts from './bakery_components/subcats/Seasonal';

import Dairy from './dairy_components/Dairy';
import CheeseProducts from './dairy_components/subcats/Cheese';
import MilkProducts from './dairy_components/subcats/Milk'
import YogurtProducts from './dairy_components/subcats/Yogurt'
import EggsButterProducts from './dairy_components/subcats/EggsButter'


import FruitAndVeg from './fruit_veg_components/FruitAndVeg';
import Fruit from './fruit_veg_components/subcats/Fruit';
import Vegetables from './fruit_veg_components/subcats/Vegetables';

import MeatAndSeafood from './meat_seafood_components/MeatAndSeafood';
import BeefProducts from './meat_seafood_components/subcats/Beef';
import DeliProducts from './meat_seafood_components/subcats/Deli'
import LambProducts from './meat_seafood_components/subcats/Lamb'
import PoultryProducts from './meat_seafood_components/subcats/Poultry'
import PorkProducts from './meat_seafood_components/subcats/Pork'
import SeafoodProducts from './meat_seafood_components/subcats/Seafood'


function Products() {
    return (
        <div className="App">
          <Routes>
            <Route path="/products/bakery" element={ <Bakery/> } />
              <Route path="/products/bread" element={ <BreadProducts/> } />
              <Route path="/products/pastries_desserts" element={ <DessertProducts/> } />
              <Route path="/products/glutenfree_vegan" element={ <GlutenFreeVeganProducts/> } />
              <Route path="/products/savory_baked_goods" element={ <SavoryProducts/> } /> 
              <Route path="/products/seasonal" element={ <SeasonalProducts/> } /> 

            <Route path="/products/meat_seafood" element={ <MeatAndSeafood/> } />
              <Route path="/products/beef" element={ <BeefProducts/> } />
              <Route path="/products/deli" element={ <DeliProducts/> } />
              <Route path="/products/lamb" element={ <LambProducts/> } />
              <Route path="/products/poultry" element={ <PoultryProducts/> } /> 
              <Route path="/products/pork" element={ <PorkProducts/> } /> 
              <Route path="/products/seafood" element={ <SeafoodProducts/> } /> 

            <Route path="/products/dairy" element={ <Dairy/> } />
              <Route path="/products/cheese" element={ <CheeseProducts/> } />
              <Route path="/products/eggs_butter" element={ <EggsButterProducts/> } />
              <Route path="/products/milk" element={ <MilkProducts/> } />
              <Route path="/products/yogurt" element={ <YogurtProducts/> } /> 

            <Route path="/products/fruit_vegetables" element={ <FruitAndVeg/> } />
              <Route path="/products/fruit" element={ <Fruit/> } />
              <Route path="/products/vegetables" element={ <Vegetables/> } />

              <Route path="/products/:id" element={<ProductDetails />} />

          </Routes>
        </div>
      );
    }

export default Products;