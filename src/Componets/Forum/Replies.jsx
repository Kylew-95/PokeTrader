import React, { useState } from "react";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { TextField, Button } from "@mui/material";

function Replies({ user, profileData }) {
  const [replyText, setReplyText] = useState("");

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    // Fetch the current forum data for the thread
    const { data: forumData, error } = await supabase.from("forum").select("*");

    if (error) {
      console.error("Error fetching forum data:", error.message);
      return;
    }

    let forumIdToUpdate;
    let currentReplies = [];

    if (forumData && forumData.length > 0) {
      // If the forum thread exists, use the first entry
      forumIdToUpdate = forumData[0].id;
      currentReplies = forumData[0].forums_replies || [];
    } else {
      // If the forum thread doesn't exist, create a new entry with the provided forums_id
      const { data: newForumData, error: newForumError } = await supabase
        .from("forum")
        .insert([{ forums_replies: [] }])
        .select();

      if (newForumError) {
        console.error("Error creating new forum entry:", newForumError.message);
        return;
      }

      forumIdToUpdate = newForumData[0].id;
    }

    const newReply = {
      id: profileData?.settings_id,
      content: replyText,
      author: profileData?.settings_username,
      timestamp: new Date().toISOString(),
    };
    console.log(newReply); // Check the console to see the new reply object

    const updatedReplies = [...currentReplies, newReply];

    // Update the database with the new replies (array of objects)
    const { updateError } = await supabase
      .from("forum")
      .update({
        forums_replies: updatedReplies, // No need to JSON.stringify here
      })
      .eq("id", forumIdToUpdate)
      .select();

    if (updateError) {
      console.error("Error updating replies:", updateError.message);
      return;
    }
    setReplyText("");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmitReply}>
          <TextField
            onChange={(e) => setReplyText(e.target.value)}
            type="text"
            name="reply"
            placeholder="Reply to this post"
            value={replyText}
            required={true}
            className="commentInput"
          />
          <Button type="submit" variant="text">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default Replies;
