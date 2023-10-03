import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Carousel = () => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <Slider {...settings}>
        <div>
          <h3>da</h3>
        </div>
        <div>
          <h3>SLIDE 2</h3>
        </div>
        <div>
          <h3>SLIDE 3</h3>
        </div>
        <div>
          <h3>SLIDE 4</h3>
        </div>
        <div>
          <h3>SLIDE 5</h3>
        </div>
        <div>
          <h3>SLIDE 6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;