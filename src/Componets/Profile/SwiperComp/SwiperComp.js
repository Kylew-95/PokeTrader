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
import { Button } from "@mui/material";

export default function SwiperComp({ user, favouriteCard }) {
  const [swiperData, setSwiperData] = useState([]);
  const [favouriteData, setFavouriteData] = useState([]);

  console.log(swiperData);

  useEffect(() => {
    async function fetchUserData() {
      const { data, error } = await supabase
        .from("user_favourites")
        .select("*")
        .eq("favourite_id", user?.id);

      if (error) {
        throw error;
      }
      if (data) {
        setSwiperData(data);
        setFavouriteData(data);
        console.log(favouriteData); // this is the data you want to map over
        // yes, you can map over data here
      }
    }
    fetchUserData();
  }, [user]);

  async function handleDelete(favouriteId) {
    try {
      const { data, error } = await supabase
        .from("user_favourites")
        .delete()
        .eq("id", favouriteId);
      if (error) {
        throw error;
      }
      console.log("Successfully deleted:", data);
    } catch (error) {
      console.log("Successfully deleted:", error);
    }
  }

  return (
    <>
      <Swiper
        initialSlide={2}
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
        {swiperData.map((photo, index) => (
          <SwiperSlide className="swiper-slide" key={photo.id}>
            <div className="swiper-slide">
              <img src={photo.favourite_cards} alt={photo.favourite_alt} />
            </div>
            <Button
              style={{
                backgroundColor: "#ffcb05",
                bottom: "4vh",
                marginBottom: "0px",
              }}
              variant="contained"
              on
              onClick={() => {
                handleDelete(photo.id);
                const index = swiperData.findIndex(
                  (item) => item.id === photo.id
                );
                setSwiperData((prevData) => {
                  const newData = [
                    ...prevData.slice(0, index),
                    ...prevData.slice(index + 1),
                  ];
                  return newData;
                });
              }}
            >
              Remove
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
      {/*  */}
    </>
  );
}
