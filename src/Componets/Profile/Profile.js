import React from "react";
import "./Profile.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SwiperComp from "./SwiperComp/SwiperComp";

function Profile({ user }) {
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
        <div className="ProfileContainer">
          <div>
            <h1 className="ProfileTitle">Welcome Back {handleFirstName()}</h1>
          </div>
          <h2 className="ProfileName">Hi {user?.email} is this your email?</h2>
          <SwiperComp />
          <div className="signOutbtn">
            <Button variant="contained" onClick={handleLogout}>
              SignOut
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
