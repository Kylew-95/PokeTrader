import React, { useState, useCallback } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import CardPopup from "../CardPopup/CardPopup";
import Grid from "@mui/material/Grid";
import { supabase } from "../SupabaseLogin/SupabaseLogin";

import { rareColors, typeColors } from "./Types";
import "./PokeDisplay.css";
import { Button } from "@mui/material";

function PokeDisplay({ pokeData, favouriteCard, userid }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 9; // Number of items to display per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokeData = pokeData?.slice(startIndex, endIndex) || [];

  const handleCardClick = (pokeData) => {
    setSelectedCard(pokeData);
  };

  const handleClosePopup = () => {
    setSelectedCard(null);
  };

  const handleFavouriteCard = useCallback(async () => {
    // const newFavouriteCard = Array.isArray(favouriteCard)
    //   ? favouriteCard
    //       .filter((card) => card.images?.small) // Check if card.images?.small exists and is truthy
    //       .map((card) => card.images.small)
    //   : [];

    console.log("favouriteCard:", favouriteCard);
    // console.log("filteredCards:", newFavouriteCard);

    try {
      // UPSERT MATCHING ROWS
      const { data, error } = await supabase
        .from("user_faviourtes")
        .upsert([{ faviourte_id: userid?.id, faviourte_cards: favouriteCard }])
        .select();

      console.log(data, error);
    } catch (error) {
      console.error("Error during upsert:", error);
    }
  }, [favouriteCard, userid?.id]);

  if (!pokeData) {
    return (
      <img src="./Loading/running-pikachu-transparent-snivee.gif" alt="" />
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
                  <img id="pokeImg" src={poksData.images.small} alt="" />
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
                <Button onClick={handleFavouriteCard} variant="contained">
                  Add to Faviourites
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
