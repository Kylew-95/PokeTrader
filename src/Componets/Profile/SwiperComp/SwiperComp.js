import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { supabase } from "../../SupabaseLogin/SupabaseLogin";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../SwiperComp/SwiperComp.css";
import damageIcon from "../../Images/icons/Damage sheild.png";
import attackIcon from "../../Images/icons/explosion.png";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Button } from "@mui/material";
import { Height } from "@mui/icons-material";
//
export default function SwiperComp({ user }) {
  const [swiperData, setSwiperData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const textContainerRef = useRef(null);

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
        console.log(data); // this is the data you want to map over
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
      console.log("Error deleting:", error);
    }
  }

  return (
    <>
      {swiperData.length === 0 ? (
        <div className="swiper-Stats">
          <p>sorry no favourites</p>
        </div>
      ) : (
        <>
          <div className="swiper-Stats">
            {swiperData.map((item, index) => (
              <div
                key={index + 1}
                style={{ display: index === activeIndex ? "block" : "none" }}
              >
                <div className="text-container" ref={textContainerRef}>
                  <h2 id="swiperPokeName">{item.favourite_name}</h2>
                </div>
                <h3 className="swiperIconsandText">
                  <img src={attackIcon} alt="noIMG" style={{ width: "30px" }} />
                  {item.favourite_attacks[0].name}
                </h3>
                <h3 className="swiperIconsandText">
                  <img src={damageIcon} alt="noIMG" style={{ width: "30px" }} />
                  {item.favourite_attacks[0].damage || "none"}
                </h3>
                <br />
                <p id="swiperAttacks" style={{ width: "10vw" }}>
                  {item.favourite_attacks[0].text}
                </p>
              </div>
            ))}
          </div>
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
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
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
                  onClick={async () => {
                    await handleDelete(photo.id);
                    const index = swiperData.findIndex(
                      (item) => item.id === photo.id
                    );
                    setSwiperData((prevData) =>
                      prevData.filter((_, i) => i !== index)
                    );
                  }}
                >
                  Remove
                </Button>
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </>
  );
}
