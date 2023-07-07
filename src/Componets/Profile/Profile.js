import React from "react";
import { supabase } from "../SupabaseLogin/SupabaseLogin";

function Profile() {
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("Error logging out:", error.message);
    }
  };
  return (
    <div>
      <button id="logoutBtn" onClick={logout}>
        LogOut
      </button>
    </div>
  );
}

export default Profile;
