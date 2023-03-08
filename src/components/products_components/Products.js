import React from 'react';
import {Routes, Route} from 'react-router-dom';

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


import Produce from './produce_components/Produce';
import Fruit from './produce_components/subcats/Fruit';
import Vegetables from './produce_components/subcats/Vegetables';

import MeatAndSeafood from './meat_seafood_components/MeatAndSeafood';
import BeefProducts from './meat_seafood_components/subcats/Beef';
import DeliProducts from './meat_seafood_components/subcats/Deli'
import LambProducts from './meat_seafood_components/subcats/Lamb'
import PoultryProducts from './meat_seafood_components/subcats/Poultry'
import PorkProducts from './meat_seafood_components/subcats/Pork'
import SeafoodProducts from './meat_seafood_components/subcats/Seafood'


function Products({setCartItemTotal, cartItemTotal}) {
    return (
        <div className="App">
          <Routes>
            <Route path="/products/bakery" element={ <Bakery setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/bread" element={ <BreadProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/pastries_desserts" element={ <DessertProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/glutenfree_vegan" element={ <GlutenFreeVeganProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/>} />
              <Route path="/products/savory_baked_goods" element={ <SavoryProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 
              <Route path="/products/seasonal" element={ <SeasonalProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 

            <Route path="/products/meat_seafood" element={ <MeatAndSeafood setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/beef" element={ <BeefProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/deli" element={ <DeliProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/lamb" element={ <LambProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/poultry" element={ <PoultryProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 
              <Route path="/products/pork" element={ <PorkProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 
              <Route path="/products/seafood" element={ <SeafoodProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 

            <Route path="/products/dairy" element={ <Dairy setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/cheese" element={ <CheeseProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/eggs_butter" element={ <EggsButterProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/milk" element={ <MilkProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/yogurt" element={ <YogurtProducts setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } /> 

            <Route path="/products/produce" element={ <Produce setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/fruit" element={ <Fruit setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />
              <Route path="/products/vegetables" element={ <Vegetables setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/> } />

              <Route path="/products/:id" element={<ProductDetails setCartItemTotal={setCartItemTotal} cartItemTotal={cartItemTotal}/>} />

          </Routes>
        </div>
      );
    }

export default Products;