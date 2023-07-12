import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import battlegif from "../Images/pokemon-battle-pokemon.gif";
import "./SupabaseLogin.css";
import { useNavigate } from "react-router-dom";
import NavExtender from "../NavExtender/NavExtender";

export const supabase = createClient(
  process.env.REACT_APP_POKE_SB_URL,
  process.env.REACT_APP_POKE_SB_KEY
);

export default function Login() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        navigate("/Profile");
        window.location.reload();
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <>
      <NavExtender />

      {!session ? (
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
        </div>
      ) : null}
      <div className="battleGif">
        <img id="battleGifId" src={battlegif} alt="moving gif" />
      </div>
    </>
  );
}
