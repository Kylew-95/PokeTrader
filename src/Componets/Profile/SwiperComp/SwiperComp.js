import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import miles from "../../Images/pikachu icon.png";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../SwiperComp/SwiperComp.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function SwiperComp() {
  const photos = [miles, miles, miles, miles, miles, miles, miles, miles];

  return (
    <>
      <Swiper
        initialSlide={4}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="swiper"
      >
        {photos.map((photo) => (
          <SwiperSlide className="swiper-slide" key={photo}>
            <div className="swiper-slide">
              <img src={photo} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
