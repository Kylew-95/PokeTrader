import React, { useState } from "react";
// import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { TextField } from "@mui/material";

function Replies({ user }) {
  const [replies, setReplies] = useState([]);

  //   async function userReplies() {
  //     const { data } = await supabase
  //       .from("forum")
  //       .update({ forums_replies: replies })
  //       .eq("forums_username", user?.id)
  //       .select();
  //     setReplies(data);
  //   }
  //   userReplies();

  function onChange(e) {
    setReplies([{ forums_replies: e.target.value }]);
  }

  return (
    <>
      {replies.map((reply, index) => {
        return <p key={index}>{reply.forums_replies}</p>;
      })}

      <TextField
        onChange={onChange}
        name="forums_replies"
        placeholder="Reply to this post"
        value={replies}
        className="commentInput"
      />
    </>
  );
}

export default Replies;
