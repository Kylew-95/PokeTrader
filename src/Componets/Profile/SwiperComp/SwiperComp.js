import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { supabase } from "../../SupabaseLogin/SupabaseLogin";
// import miles from "../../Images/pikachu icon.png";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../SwiperComp/SwiperComp.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

export default function SwiperComp({ user }) {
  const [swiperData, setSwiperData] = useState([]);

  console.log(swiperData);

  useEffect(() => {
    async function fetchUserData() {
      const { data, error } = await supabase
        .from("user_faviourtes")
        .select("*")
        .eq("faviourte_id", user.id);

      if (error) {
        throw error;
      }
      if (data) {
        setSwiperData(data);
        console.log(data); // this is the data you want to map over
        // yes, you can map over data here
      }
    }
    fetchUserData();
  }, [user]);

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
        {swiperData.map((photo) => (
          <SwiperSlide className="swiper-slide" key={photo.id}>
            <div className="swiper-slide">
              <img src={photo.faviourte_cards} alt="" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
