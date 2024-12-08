import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Hero() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="section-slide">
      <div className="wrap-slick1">
        <Slider {...sliderSettings}>
          {/* Slide 1 */}
          <div className="item-slick1 slide-1">
            <div className="container h-full">
              <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                <span className="ltext-101 cl2 respon2">
                  Women Collection 2024
                </span>
                <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                  NEW SEASON
                </h2>
                <div className="button-group">
                  <a
                    href="/shop"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </a>
                  <a
                    href="/sell"
                    className="flex-c-m stext-101 cl0 size-101 bg3 bor1 hov-btn3 p-lr-15 trans-04"
                  >
                    Sell Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="item-slick1 slide-2">
            <div className="container h-full">
              <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                <span className="ltext-101 cl2 respon2">Men New-Season</span>
                <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                  Jackets & Coats
                </h2>
                <div className="button-group">
                  <a
                    href="/product"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </a>
                  <a
                    href="/sell"
                    className="flex-c-m stext-101 cl0 size-101 bg3 bor1 hov-btn3 p-lr-15 trans-04"
                  >
                    Sell Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="item-slick1 slide-3">
            <div className="container h-full">
              <div className="flex-col-l-m h-full p-t-100 p-b-30 respon5">
                <span className="ltext-101 cl2 respon2">
                  Men Collection 2024
                </span>
                <h2 className="ltext-201 cl2 p-t-19 p-b-43 respon1">
                  New Arrivals
                </h2>
                <div className="button-group">
                  <a
                    href="/product"
                    className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04"
                  >
                    Shop Now
                  </a>
                  <a
                    href="/sell"
                    className="flex-c-m stext-101 cl0 size-101 bg3 bor1 hov-btn3 p-lr-15 trans-04"
                  >
                    Sell Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
}

export default Hero;
