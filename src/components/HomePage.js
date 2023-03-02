import React from 'react';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

function HomePage() {
    return(
        <div className="mainBodyContainer">
        <h1 className='pageTitle' >HomePage</h1>
        <FontAwesomeIcon icon={faCartShopping}/> 
        </div>
    );
}
export default HomePage;