import React from 'react'
import Slider from 'react-slick'

const Myslider = () => {

  const images = [
    "http://www.menucool.com/slider/prod/image-slider-5.jpg",
    "http://www.jssor.com/demos/img/home/02.jpg",
    "http://www.menucool.com/slider/prod/image-slider-2.jpg",
    "http://wowslider.com/sliders/demo-11/data/images/krasivyi_korabl_-1024x768.jpg"
      ]

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1


    };

    let imgDivs = (images || []).map((image, index) => {
                       return (
                         <div key={index}>
                           <img src={image}  />
                         </div>
                       )
                     });


    return (
      <Slider {...settings}>
      { imgDivs }
      </Slider>
    );

}
export default Myslider
