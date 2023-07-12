import React from "react";
import "./Profile.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Avatar, Button, Grid } from "@mui/material";
import BottomNav from "./BottomNav/BottomNav";
import { useNavigate } from "react-router-dom";
import SwiperComp from "./SwiperComp/SwiperComp";
import NavExtender from "../NavExtender/NavExtender";

function Profile({ user, favouriteCard }) {
  const navigate = useNavigate();

  console.log("favouriteCard:", favouriteCard[0]?.name);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/Login");
    window.location.reload();
  };

  const returnUserToLogin = () => {
    navigate("/Login");
    return null;
  };

  function handleFirstName() {
    const firstName = user?.user_metadata.full_name.split(" ")[0];
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
                {user?.user_metadata.full_name[0]}
              </Avatar>
              <h2 id="ProfileName">Hi {handleFirstName()}</h2>
              <p>{user.email}</p>
              <p>{user.aud}</p>
              <div className="bottomNav">
                <BottomNav />
              </div>
            </aside>
            <div className="signOutbtn">
              <Button variant="contained" onClick={handleLogout}>
                SignOut
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="SwiperboxContainer">
              <div className="ProfileContainerMain">
                <div className="profileSwiperHeaders">
                  <h3 style={{ fontSize: "2rem", fontWeight: 600 }}>Stats</h3>
                  <h3
                    style={{
                      fontSize: "2rem",
                    }}
                    className="ProfileTitle"
                  >
                    Your Favourite Pokemon
                  </h3>
                </div>
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
