import React, { useEffect, useState } from "react";

import { supabase } from "../SupabaseLogin/SupabaseLogin";
import "./Posts.css"; // Import the CSS file for styling

function Posts() {
  const [showPosts, setShowPosts] = useState([]);

  async function getPosts() {
    const { data } = await supabase
      .from("forum")
      .select("*")
      .order("created_time", { ascending: true });
    setShowPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="post-container">
      {" "}
      {/* Wrap all posts in a container div */}
      {showPosts.map((post) => (
        <div key={post.id} className="post-box">
          {" "}
          {/* Apply a class for styling */}
          <h1>{post.forums_title}:</h1>
          <h2>username: {post.forums_email}</h2>
          <h3>Comment</h3>
          <p>{post.forums_comments}</p>
        </div>
      ))}
    </div>
  );
}

export default Posts;
