import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./SupabaseLogin.css";
import Profile from "../Profile/Profile";

export const supabase = createClient(
  process.env.REACT_APP_POKE_SB_URL,
  process.env.REACT_APP_POKE_SB_KEY
);

export default function Login() {
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUserId(session?.user.id);
      console.log(session?.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="totalSignup">
        <div className="auth-container">
          <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <Profile userId={userId} />
      </div>
    );
  }
}
