import "./App.css";
import Profile from "../Profile/Profile";
import ResponsiveNavBar from "../NavBar/Navbar";
import PokeDisplay from "../PokeDisplay/PokeDisplay";
import { supabase } from "../SupabaseLogin/SupabaseLogin.jsx";
import SupabaseLogin from "../SupabaseLogin/SupabaseLogin";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [pokeData, setPokeData] = useState(""); //
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://api.pokemontcg.io/v2/cards?id=${pokeData}`,
        {
          headers: {
            "X-Api-Key": process.env.REACT_APP_POKE_KEY,
          },
        }
      );
      const newPokeData = await response.json();
      setPokeData(newPokeData.data); // Set the state to the new data
      // console.log(newPokeData);
      // Do something with pokeData
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchUserData() {
      const { user, error } = await supabase.auth.getSession();

      if (error) {
        console.log("Error fetching user data:", error);
      } else if (user) {
        const { data, error } = await supabase
          .from("new_users")
          .select("*")
          .eq("new_user_id", user.id)
          .single(); // Use 'single()' to retrieve a single user

        if (error) {
          console.log("Error fetching user data:", error);
        } else {
          setUser(data);
          console.log("User data:", data);
        }
      } else {
        console.log("User is not authenticated");
      }
    }

    fetchUserData();
  }, []);

  return (
    <>
      <Router>
        <ResponsiveNavBar userId={user} />
        <Routes>
          <Route path="Home" element={<PokeDisplay />} />
          <Route path="Profile" element={<Profile user={user} />} />
          <Route path="/Login" element={<SupabaseLogin />} />
          <Route
            path="/"
            element={
              <>
                <section className="homepage">
                  <img
                    id="pokemonTitle"
                    src="/Loading/pokemon title.png"
                    alt=""
                  />
                  <h2>Click on the cards to find out more below</h2>
                </section>
                <section className="mainContent">
                  <PokeDisplay pokeData={pokeData} />
                </section>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
