import React, { useState, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardPopup from "../CardPopup/CardPopup";
import Grid from "@mui/material/Grid";
import { supabase } from "../SupabaseLogin/SupabaseLogin";

import { rareColors, typeColors } from "./Types";
import "./PokeDisplay.css";
import { Button } from "@mui/material";
import SearchBar from "../SearchBar/SearchBar";

function PokeDisplay({ pokeData, pokeData2, userid }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchTerm(e.target.value);
  // };

  const filteredData = Array.isArray(pokeData)
    ? pokeData.filter((poke) => {
        return poke.name?.toLowerCase().match(searchTerm.toLowerCase());
      })
    : [];

  console.log("Filtered Data:", filteredData);

  const handlePageChange = (e, page) => {
    setCurrentPage(page);
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  //
  const itemsPerPage = 9; // Number of items to display per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokeData = pokeData?.slice(startIndex, endIndex) || [];
  console.log(pokeData2.imageUrl);

  const handleCardClick = (pokeData) => {
    setSelectedCard(pokeData);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  // const handleSearch = (pokeData.name) => {
  //   setSearchedCards(pokeData.name);
  //   setCurrentPage(1);
  // };

  const handleFavouriteCard = useCallback(
    async (cardData) => {
      const newFavouriteCard = cardData?.images?.small || null;
      const flavourText = cardData?.flavorText || null;

      console.log("filteredCards:", newFavouriteCard);

      try {
        // UPSERT MATCHING ROWS
        const { data, error } = await supabase
          .from("user_favourites")
          .upsert([
            {
              favourite_id: userid?.id,
              favourite_cards: newFavouriteCard,
              favourite_alt: flavourText,
              favourite_name: cardData?.name,
              favourite_attacks: cardData?.attacks,
              favourite_hp: cardData?.hp,
              favourite_level: cardData?.level,
            },
          ])
          .select();

        console.log(data, error);
      } catch (error) {
        console.error("Error during upsert:", error);
      }
    },
    [userid?.id]
  );

  const displayData = currentPage > 0 ? currentPokeData : currentPage;

  console.log("displayData:", displayData);

  if (!pokeData) {
    return (
      <img
        style={{ width: "50vw", flexShrink: "0" }}
        src="./Loading/running-pikachu-transparent-snivee.gif"
        alt=""
      />
    );
  }

  return (
    <>
      <Stack id="pagination" spacing={2}>
        <Pagination
          count={Math.ceil(pokeData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
        <SearchBar
          pokeData={pokeData}
          handleSearch={handlePageChange}
          searchTerm={searchTerm}
        />
      </Stack>
      <CardPopup poksData={selectedCard} onClose={handleClosePopup} />
      {pokeData.length > 0 ? (
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="center"
          columnGap={0.2}
          rowSpacing={10}
        >
          {currentPokeData.map((poksData) => (
            <Grid item xs={12} sm={4} md={4} lg={3} key={poksData.id}>
              <div className="card_container">
                <div
                  id="card"
                  className="menu__container"
                  onClick={() => handleCardClick(poksData)}
                >
                  <img
                    id="pokeImg"
                    src={poksData.images.small || pokeData2.imageUrl}
                    alt=""
                  />
                </div>
              </div>
              <p id="Att">
                <span
                  id="typeColour"
                  style={{ color: typeColors[poksData.types[0]] }} // Apply type color
                >
                  {poksData.types[0]}
                </span>
                <p
                  id="rareColour"
                  style={{ color: rareColors[poksData.rarity] }} // Apply rarity color
                >
                  {poksData.rarity || "No rarity"}
                </p>
              </p>
              <div className="attContainer">
                <h3>
                  <span id="hp">Hp </span>
                  {poksData.hp}
                </h3>
                <Button
                  onClick={() => handleFavouriteCard(poksData)}
                  variant="contained"
                >
                  Add to Favourites
                </Button>
                <h3>
                  <span id="market">
                    ${poksData.cardmarket?.prices.trendPrice}
                  </span>
                </h3>
              </div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <h1>No data available</h1>
      )}
    </>
  );
}

export default PokeDisplay;
