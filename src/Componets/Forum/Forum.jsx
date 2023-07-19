import React from "react";
import NavExtender from "../NavExtender/NavExtender";
import "./Forum.css";
import Posts from "./Posts";
import CreatePost from "./CreatePost";

function Forum() {
  // const [showCreatePost, setShowCreatePost] = useState(false);
  return (
    <>
      <NavExtender />
      <div className="Forum">
        <Posts />
      </div>
      <div className="createPost">
        <CreatePost />
      </div>
    </>
  );
}

export default Forum;
