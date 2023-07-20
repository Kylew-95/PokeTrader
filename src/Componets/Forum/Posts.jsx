import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import "./Posts.css"; // Import the CSS file for styling

function Posts({ profileData, user }) {
  const [showPosts, setShowPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  async function getPosts() {
    const { data } = await supabase
      .from("forum")
      .select("*")
      .order("created_time", { ascending: true });
    setShowPosts(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getPosts();
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        Loading...
      </div>
    );
  } else if (showPosts.length === 0) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        No posts available here
      </div>
    );
  } else {
    return (
      <div className="post-container">
        {showPosts.map((post) => {
          return (
            <div key={post.id} className="post-box">
              <h1>{post.forums_title}:</h1>
              <div className="forum-user">
                <h2 className="forum-user">
                  {profileData && ( // Check if profile exists before accessing its data
                    <>
                      <Avatar
                        sx={{ width: 32, height: 32, bgcolor: "orange" }}
                        alt={profileData.settings_username.charAt(0)}
                        src={"/static/images/avatar/1.jpg"}
                      />
                      {profileData.settings_username}
                    </>
                  )}
                </h2>
              </div>
              <div className="forum-comment-box">
                <h3>Comment</h3>
                <p>{post.forums_comments}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Posts;
