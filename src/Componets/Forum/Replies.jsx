import React, { useState, useEffect } from "react";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { TextField, Button } from "@mui/material";

function Replies({ forumId, profileData }) {
  const [replyText, setReplyText] = useState("");
  const [forumData, setForumData] = useState([]);

  useEffect(() => {
    const fetchForumData = async () => {
      // Fetch the specific forum entry that matches the provided forumId
      const { data: forumEntry, error } = await supabase
        .from("forum")
        .select("*")
        .eq("id", forumId)
        .single();

      if (error) {
        console.error("Error fetching forum data:", error.message);
      } else {
        setForumData(forumEntry ? [forumEntry] : []);
      }
    };
    fetchForumData();
  }, [forumId]);

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    // Find the specific forum entry that matches the provided forumId
    const currentForum = forumData.find((forum) => forum.id === forumId);

    if (!currentForum) {
      console.error("Forum not found with the provided ID.");
      return;
    }
    const newReply = {
      replyId: currentForum.id,
      replyUserId: profileData?.settings_id,
      content: replyText,
      author: profileData?.settings_username,
      created_time: new Date().toUTCString(),
    };
    const currentReplies = currentForum.forums_replies || [];
    const updatedReplies = [...currentReplies, newReply];
    // Update the database with the new replies (array of objects)
    // eslint-disable-next-line no-unused-vars
    const { data: updatedData, error: updateError } = await supabase
      .from("forum")
      .update({
        forums_replies: updatedReplies,
      })
      .eq("id", currentForum.id)
      .select();

    setTimeout(() => {
      window.location.reload();
    }, 1000);

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
