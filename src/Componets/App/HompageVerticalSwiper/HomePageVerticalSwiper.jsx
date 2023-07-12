import { Swiper, SwiperSlide } from "swiper/react";
import background1 from "../../Images/Homepageslides/Pokémon-wallpapers-5.jpg";
import background2 from "../../Images/Homepageslides/one peice bg.jpg";
import background3 from "../../Images/Homepageslides/Digimonbackground.jpg";
import background4 from "../../Images/Homepageslides/yugioh-background.jpg";

// Import Swiper styles
import "swiper/css/pagination";
import "./Homeswiper.css";

// import required modules
import { Pagination, Autoplay, Navigation } from "swiper/modules";
function HomePageVerticalSwiper() {
  let homePageslides = [background1, background2, background3, background4];

  return (
    <>
      <div className="homepageSwiperOv">
        <Swiper
          style={{
            position: "absolute",
            height: "100%",
            width: "50%",
            objectFit: `cover`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "0",
            left: 0,
            top: 0,
          }}
          className="homepageSwiper"
          modules={[Navigation, Pagination, Autoplay]}
          direction={"vertical"}
          slidesPerView={1}
          navigation
          loop={true}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {homePageslides.map((slide) => (
            <SwiperSlide key={slide}>
              <img
                style={{ height: "100vh", width: "auto", objectFit: "cover" }}
                src={slide}
                alt=""
              ></img>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default HomePageVerticalSwiper;
