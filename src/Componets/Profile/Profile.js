import React from "react";
import "./Profile.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/Login");
    window.location.reload(); // Trigger refresh after logout
  };

  return (
    <>
      <div className="ProfileContainer">
        <div>
          <h1 className="ProfileTitle">Profile</h1>
        </div>
        <h2 className="ProfileName">Hi {user?.email} is this your email?</h2>
        <div className="signOutbtn">
          <Button variant="contained" onClick={handleLogout}>
            SignOut
          </Button>
        </div>
      </div>
    </>
  );
}

export default Profile;
