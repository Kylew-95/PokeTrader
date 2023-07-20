/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { TextField, Button } from "@mui/material";

function Replies({ user }) {
  const [replyText, setReplyText] = useState("");

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    // Fetch the current forum data
    const { data: forumData, error } = await supabase
      .from("forum")
      .select("forums_replies")
      .eq("forums_username", user?.id);

    if (error) {
      console.error("Error fetching forum data:", error.message);
      return;
    }

    const currentReplies = forumData[0]?.forums_replies || [];

    // Append the new reply to the existing replies
    const updatedReplies = [...currentReplies, replyText];

    // Update the database with the new replies
    const { data: updatedData, updateError } = await supabase
      .from("forum")
      .insert([{ forums_replies: updatedReplies }])
      .eq("forums_username", user?.id)
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
