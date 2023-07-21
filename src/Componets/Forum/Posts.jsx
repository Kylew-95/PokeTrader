import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import "./Posts.css"; // Import the CSS file for styling
import Replies from "./Replies";
function Posts({ user, profileData }) {
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
                {post.forums_replies !== null &&
                  post.forums_replies.map((reply, index) => (
                    <div key={index} className="forum-user">
                      <div className="forum-avatar-reply">
                        <Avatar
                          sx={{
                            width: 20,
                            height: 20,
                            bgcolor: "blue",
                            fontSize: 10,
                          }}
                          alt={reply.author}
                          src={"/static/images/avatar/1.jpg"}
                        />
                        <p>{reply.author}</p>
                      </div>
                      <p>{reply.content}</p>
                      <p>{reply.timestamp}</p>
                    </div>
                  ))}
              </div>
              <Replies
                user={user}
                profileData={profileData}
                forumId={post.id}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Posts;
