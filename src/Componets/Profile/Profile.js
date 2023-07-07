import React from "react";
import "./Profile.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  async function signOut() {
    await supabase.auth.signOut();
    const navigateTo = () => {
      navigate("/Login");
    };
    navigateTo();
  }

  return (
    <div>
      <h1 className="ProfileTitle">Profile</h1>
      <div className="signOutbtn">
        <Button variant="contained" onClick={signOut}>
          SignOut
        </Button>
      </div>
    </div>
  );
}

export default Profile;
