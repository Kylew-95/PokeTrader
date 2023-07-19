import { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { supabase } from "../SupabaseLogin/SupabaseLogin";
import { Button } from "@mui/material";

const initialState = { title: "", content: "" };

function CreatePost() {
  const [post, setPost] = useState(initialState);
  const [getUser, setGetUser] = useState(null);
  const { title, content } = post;

  function onChange(e) {
    setPost((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  }

  async function createNewPost() {
    if (!title || !content) return;

    const user = await supabase.auth.getUser();
    setGetUser(user.data.user);
    console.log("getUser:", getUser.id);
    try {
      const { data } = await supabase
        .from("forum")
        .upsert([
          {
            forums_email: title,
            forums_comments: content,
            forums_id: getUser.id,

            user_email: getUser.email,
          },
        ])
        .single();

      if (!data) {
        console.error("Insert operation didn't return any data.");
        return;
      }

      //   console.log("Inserted data:", data);

      await supabase.from(`Forum/posts/${data.title}`).push(data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <div>
      <h1 className="createPost">Create new post</h1>
      <input
        onChange={onChange}
        name="title"
        placeholder="Title"
        value={post.title}
        className="commentInput"
      />
      <SimpleMDE
        value={post.content}
        onChange={(value) => setPost({ ...post, content: value })}
      />
      <Button variant="contained" onClick={createNewPost}>
        Create Post
      </Button>
    </div>
  );
}

export default CreatePost;
