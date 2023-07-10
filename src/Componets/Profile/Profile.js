import React from "react";
import "./Profile.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SwiperComp from "./SwiperComp/SwiperComp";

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
        <div className="navExtender"></div>
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
            <SwiperComp user={user} favouriteCard={favouriteCard} />
          </div>
        </div>
        <div className="signOutbtn">
          <Button variant="contained" onClick={handleLogout}>
            SignOut
          </Button>
        </div>
      </>
    );
  }
}

export default Profile;
