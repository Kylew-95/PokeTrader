import { useState, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Button, TextField } from "@mui/material";

const initialState = { title: "", content: "" };

function CreatePost() {
  const [post, setPost] = useState(initialState);
  const [getUser, setGetUser] = useState(null);
  const { title, content } = post;

  // Effect hook to fetch user data when the component mounts
  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await supabase.auth.getUser();
        setGetUser(user.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  function onChange(e) {
    setPost((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  // This function is to handle the SimpleMDE content change
  function onContentChange(value) {
    setPost((prevState) => ({ ...prevState, content: value }));
  }

  async function createNewPost() {
    if (!title || !content) return;

    try {
      // eslint-disable-next-line no-unused-vars
      const { data } = await supabase
        .from("forum")
        .insert([
          {
            forums_title: title,
            forums_comments: content,
            forums_id: getUser.id,
            forums_email: getUser.email,
          },
        ])
        .single();

      // console.log("Data to be inserted:", data);
      setPost(initialState);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <div>
      <h1 className="createPost">Create new post</h1>
      <TextField
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={title}
        className="commentInput"
      />
      <SimpleMDE
        className="simpleMDE"
        value={content}
        onChange={onContentChange}
      />
      <Button variant="contained" onClick={createNewPost}>
        Create Post
      </Button>
    </div>
  );
}

export default CreatePost;
