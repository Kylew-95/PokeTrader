import React from "react";
import "./Profile.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile({ user }) {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut().then;
    const navigateTo = () => {
      navigate("/Login");
    };
    navigateTo();
  }

  return (
    <>
      <div className="ProfileContainer">
        <div>
          <h1 className="ProfileTitle">Profile</h1>
        </div>
        <h2 className="ProfileName">Hi {user?.email} is this your email?</h2>
        <div className="signOutbtn">
          <Button variant="contained" onClick={signOut}>
            SignOut
          </Button>
        </div>
      </div>
    </>
  );
}

export default Profile;
