import React from 'react';
import backgroundImage from './images/image-from-rawpixel-id-3259575-original.jpg';

function Homepage() {   
  return (
    <div className='background-image' style={{backgroundImage: `url(${backgroundImage})`}}>
    </div>
  );
}

export default Homepage;
