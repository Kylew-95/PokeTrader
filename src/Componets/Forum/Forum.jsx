import React from "react";
import NavExtender from "../NavExtender/NavExtender";
import "./Forum.css";
import CreatePost from "./CreatePost";

function Forum() {
  return (
    <>
      <NavExtender />
      <div className="Forum"></div>
      <CreatePost />
    </>
  );
}

export default Forum;
