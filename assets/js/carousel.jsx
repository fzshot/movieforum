import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import { Carousel } from 'element-react';
import Movie_card from "./movie_card";
import MyCarouselCard from "./carouselcard"

//import Overlay from 'react-overlays/lib/Overlay';
//import Test from 'test.jsx';

export default function MyCarousel(props) {

  function handleClick(i) {
    on();
  };

  function on() {
    // document.getElementById(hello).value = "yep";
  };

  function off() {
    // this.style.show = false;
  };


	return (
    <div>
      <p id="hello" onClick={on()}> </p>
      <div className="demo-4 medium">
        <Carousel interval="4000" type="card" height="500px">
          {
            [1,2,3,4,5,6,7,8].map((item, index) => {
              return (
                <Carousel.Item key={index}>
                  <MyCarouselCard />
                </Carousel.Item>
              )
            })
          }
        </Carousel>
      </div>
    </div>

	);


}
