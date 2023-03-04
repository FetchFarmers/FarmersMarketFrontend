import React from 'react';
import Lottie from 'react-lottie';
import animationData from './Lotties/barn.json';

function HomePage() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };  

  return (
    <div className="mainBodyContainer">
      <h1 className='pageTitle' ></h1>
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
      />
    </div>
  );
}

export default HomePage;
