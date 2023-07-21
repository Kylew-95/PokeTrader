import React, { useState, useEffect } from "react";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { TextField, Button } from "@mui/material";

function Replies({ forumId, profileData }) {
  const [replyText, setReplyText] = useState("");
  const [forumData, setForumData] = useState([]);

  useEffect(() => {
    const fetchForumData = async () => {
      // Fetch the specific forum entry that matches the provided forumId
      const { data, error } = await supabase.from("forum").select("*");

      if (error) {
        console.error("Error fetching forum data:", error.message);
      } else {
        setForumData(data);
      }
    };
    fetchForumData();
  }, []);

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    // Find the specific forum entry that matches the provided forumId
    const currentForum = forumData.find((forum) => forum.id === forumId);

    if (!currentForum) {
      console.error("Forum not found with the provided ID.");
      return;
    }

    const newReply = {
      id: profileData?.settings_id,
      content: replyText,
      author: profileData?.settings_username,
      timestamp: new Date().toISOString(),
    };

    const currentReplies = currentForum.forums_replies || [];
    console.log(currentReplies);
    const updatedReplies = [...currentReplies, newReply];

    // Update the database with the new replies (array of objects)
    const { data: updatedData, error: updateError } = await supabase
      .from("forum")
      .update({
        forums_replies: updatedReplies,
      })
      .eq("id", currentForum.id)
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
