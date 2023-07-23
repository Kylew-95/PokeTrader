import React from "react";
import NavExtender from "../NavExtender/NavExtender";
import "./Forum.css";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
//
function Forum({ profileData, user, userId }) {
  // const [showCreatePost, setShowCreatePost] = useState(false);
  return (
    <>
      <NavExtender />
      <div className="Forum">
        <Posts profileData={profileData} user={user} userId={userId} />
      </div>
      <div className="createPost">
        <CreatePost profileData={profileData} />
      </div>
    </>
  );
}
//

export default Forum;
