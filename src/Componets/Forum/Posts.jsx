import React, { useEffect, useState } from "react";

import { supabase } from "../SupabaseLogin/SupabaseLogin";

function Posts() {
  const [showPosts, setShowPosts] = useState([]);
  async function getPosts() {
    const { data } = await supabase
      .from("forum")
      .select("*")
      .order("created_time", { ascending: true });
    // console.log(data);
    setShowPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {showPosts.map((post) => (
        <div key={post.id}>
          <h1>{post.forums_title}:</h1>
          <h2>username: {post.forums_email}</h2>
          <p>{post.forums_comments}</p>
        </div>
      ))}
    </>
  );
}

export default Posts;
