import React from "react";
import "./Profile.css";
import { Avatar, Grid } from "@mui/material";
import BottomNav from "./BottomNav/BottomNav";
import { useNavigate } from "react-router-dom";
import SwiperComp from "./SwiperComp/SwiperComp";

function Profile({ user, favouriteCard, profileData }) {
  const navigate = useNavigate();

  // console.log("user:", user);

  // console.log("favouriteCard:", favouriteCard[0]?.name);

  const returnUserToLogin = () => {
    navigate("/Login");
    return null;
  };

  function handleFirstName() {
    const firstName = profileData?.settings_username.split(" ")[0];
    return firstName;
  }

  if (!user) {
    return returnUserToLogin();
  } else {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="navExtenderProfile"></div>
          </Grid>
          <Grid item xs={12} md={4}>
            <aside className="ProfileData">
              <Avatar
                className="ProfileAvatar"
                autoCapitalize=""
                sx={{
                  width: 170,
                  height: 170,
                  fontSize: "5rem",
                  backgroundImage:
                    "url(../Loading/running-pikachu-transparent-snivee.gif)",
                }}
              >
                {profileData?.settings_username[0]}
              </Avatar>
              <h2 id="ProfileName">Hi {handleFirstName()}</h2>
              <p>{user.email}</p>
              <p>{user.aud}</p>
              <div className="bottomNav">
                <BottomNav />
              </div>
            </aside>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="SwiperboxContainer">
              <div className="ProfileContainerMain">
                <SwiperComp user={user} favouriteCard={favouriteCard} />
              </div>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Profile;
