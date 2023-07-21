import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import "./Posts.css"; // Import the CSS file for styling
import Replies from "./Replies";
function Posts({ user, profileData, forumId }) {
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
  } else if (showPosts.length === null) {
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
              <h1>{post.forums_title}</h1>
              <div className="forum-user">
                <h2 className="forum-user">
                  <>
                    <Avatar
                      sx={{ width: 32, height: 32, bgcolor: "orange" }}
                      alt={post.forums_username}
                      src={"/static/images/avatar/1.jpg"}
                    />
                    {post.forums_username}
                  </>
                </h2>
              </div>
              <div className="forum-comment-box">
                <h3>Comment</h3>
                <p>{post.forums_comments}</p>
                <h4>Replies</h4>
                {post.forums_replies !== null && (
                  <>
                    <div className="forum-user">
                      <div className="forum-avatar-reply">
                        <Avatar
                          sx={{
                            width: 20,
                            height: 20,
                            bgcolor: "blue",
                            fontSize: 10,
                          }}
                          alt={post.forums_replies[0]?.author}
                          src={"/static/images/avatar/1.jpg"}
                        />
                        <p>{post.forums_replies[0]?.author}</p>
                      </div>
                      <p>{post.forums_replies[0]?.timestamp}</p>
                    </div>
                    <p>{post.forums_replies[0]?.content}</p>
                  </>
                )}
              </div>
              <Replies
                user={user}
                profileData={profileData}
                forumId={forumId}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Posts;
