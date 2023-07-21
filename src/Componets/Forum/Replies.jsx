import React, { useState, useEffect } from "react";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { TextField, Button } from "@mui/material";

function Replies({ forumId, profileData }) {
  const [replyText, setReplyText] = useState("");
  const [forumData, setForumData] = useState([]);

  useEffect(() => {
    const fetchForumData = async () => {
      const { data, error } = await supabase.from("forum").select("*");
      console.log(data);
      setForumData(data);
    };

    fetchForumData();
  }, []);

  const handleSubmitReply = async (e) => {
    e.preventDefault();

    // Find the specific forum entry that matches the provided forumId
    const forumIds = forumId.map((item) => item.id);

    // Find the specific forum entry that matches the provided forumId
    let currentForum = forumData.find((forum) => forumIds.includes(forum.id));

    console.log("currentForum:", currentForum);

    // console.log("forumData:", forumData);
    // console.log("forumIds:", forumIds);

    const newReply = {
      id: profileData?.settings_id,
      content: replyText,
      author: profileData?.settings_username,
      timestamp: new Date().toISOString(),
    };

    const currentReplies = currentForum.forums_replies || [];
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
