import React from 'react';
import backgroundImage from './images/Adams_Township_Sunny_Farm.jpg'

function Homepage() {
    
  return (
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100vh'
      }}
    >
    </div>
  );
}

export default Homepage;
