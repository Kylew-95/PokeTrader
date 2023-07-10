import React from "react";
import "./Profile.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Avatar, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SwiperComp from "./SwiperComp/SwiperComp";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

function Profile({ user, favouriteCard }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/Login");
    window.location.reload();
  };

  const returnUser = () => {
    navigate("/Login");
    return null;
  };

  function handleFirstName() {
    const firstName = user?.user_metadata.full_name.split(" ")[0];
    return firstName;
  }

  if (!user) {
    return returnUser();
  } else {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className="navExtender"></div>
          </Grid>
          <Grid item xs={12} md={4}>
            <aside className="ProfileData">
              <Avatar
                className="ProfileAvatar"
                autoCapitalize=""
                sx={{ width: 170, height: 170, fontSize: "5rem" }}
              >
                {user?.user_metadata.full_name[0]}
              </Avatar>
              <h2 id="ProfileName">Hi {handleFirstName()}</h2>
              <p>{user.aud}</p>
            </aside>
            <div className="signOutbtn">
              <Button variant="contained" onClick={handleLogout}>
                SignOut
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className="ProfileContainer">
              <div className="ProfileContainerMain">
                <h3
                  style={{
                    position: "absolute",
                    display: "flex",
                    marginBottom: "30rem",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "2rem",
                  }}
                  className="ProfileTitle"
                >
                  Your Favourite Pokemon
                </h3>
                <Grid2 sx={{marginLeft: "2vw"}}>
                  <SwiperComp user={user} favouriteCard={favouriteCard} />
                </Grid2>
              </div>
            </div>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Profile;
