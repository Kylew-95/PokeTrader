import PokeDisplay from "../PokeDisplay/PokeDisplay";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pokeData, setPokeData] = useState("");

  // pokemon global fetch
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
      // console.log(newPokeData);
      // Do something with pokeData
      setPokeData(newPokeData.data);
      console.log(newPokeData.data);
    }

    fetchData();
  }, []);

  return (
    <>
      <section className="homepage">
        <img id="pokemonTitle" src="/Loading/pokemon title.png" alt="" />
        <h2>Click on the card to find out more below</h2>
      </section>
      <section className="mainContent">
        <PokeDisplay pokeData={pokeData} />
      </section>
    </>
  );
}

export default App;
