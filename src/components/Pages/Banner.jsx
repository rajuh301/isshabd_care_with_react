import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


const Banner = () => {
    return (
        <Carousel>
            <div>
                <img className='w-full' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f68f2e98717237.5efa17616ae90.png" />
          
            </div>
            <div>
                <img className='w-full ' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f68f2e98717237.5efa17616ae90.png" />
        
            </div>
            <div>
                <img className='w-full' src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/f68f2e98717237.5efa17616ae90.png" />
             
            </div>
        </Carousel>
    );
};

export default Banner;