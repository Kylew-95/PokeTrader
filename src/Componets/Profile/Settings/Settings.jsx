import React, { useState } from "react";
import NavExtender from "../../NavExtender/NavExtender";
import { Button, Grid, TextField } from "@mui/material";
import { supabase } from "../../SupabaseLogin/SupabaseLogin";

function Settings({ user }) {
  const [settings, setSettings] = useState({
    settings_id: user?.id || "",
    settings_username: "",
  });

  const { settings_id, settings_username } = settings;

  function onChange(e) {
    const { name, value } = e.target;
    setSettings((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function saveSettings() {
    try {
      if (!settings_id) {
        // If settings_id does not exist, insert a new record
        const { data, error } = await supabase
          .from("settings")
          .insert([{ ...settings, settings_id: user?.id }]);
        if (!error) {
          console.log("Insert Response:", data);
          // Update the local state with the newly inserted data
          setSettings(data[0]);
        }
      } else {
        // If settings_id exists, check if a record with that ID exists in the table
        const { data, error } = await supabase
          .from("settings")
          .select("*")
          .eq("settings_id", settings_id)
          .single();
        if (!error && data) {
          // Update the existing record
          const { error } = await supabase
            .from("settings")
            .update({
              settings_username: settings_username,
            })
            .eq("settings_id", settings_id);
          if (!error) {
            console.log("Settings updated successfully!");
          }
        } else {
          // If no record with the given settings_id exists, it should be treated as an insert operation
          const { data, error } = await supabase
            .from("settings")
            .insert([{ ...settings, settings_id: user?.id }]);
          if (!error) {
            console.log("Insert Response:", data);
            // Update the local state with the newly inserted data
            setSettings(data[0]);
          }
        }
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    }
  }

  return (
    <>
      <NavExtender />
      <div className="settings-container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="settings_username"
              label="Username"
              name="settings_username"
              value={settings_username}
              variant="outlined"
              onChange={onChange}
            />
          </Grid>
          <Button onClick={saveSettings} variant="contained">
            Save
          </Button>
        </Grid>
      </div>
    </>
  );
}

export default Settings;
