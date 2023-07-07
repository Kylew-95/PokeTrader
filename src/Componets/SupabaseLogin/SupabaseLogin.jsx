import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
// import movingGif from "../Images/ezgif-5-3ce14079c5.gif";
import battlegif from "../Images/pokemon-battle-pokemon.gif";
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
      
    });
    //
    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <>
        <div className="totalSignup">
          <div>
            <Auth
              providers={["google"]}
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                extends: "false",
                className: { container: "auth-container" },
              }}
            />
          </div>
          {/* <div className="movingGif">
            <img id="movingGifId" src={movingGif} alt="moving gif" />
          </div> */}
        </div>
        <div className="battleGif">
          <img id="battleGifId" src={battlegif} alt="moving gif" />
        </div>
      </>
    );
  } else {
    return (
      <div>
        <Profile userId={userId} />
      </div>
    );
  }
}
