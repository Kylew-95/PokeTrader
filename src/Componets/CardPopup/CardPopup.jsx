import React from "react";
import { Button } from "@mui/material";
import "./Cardpopup.css";

function CardPopup({ poksData, onClose }) {
  if (!poksData) {
    return null; // Render nothing if poksData is null
  }

  function readFlavorText() {
    if (poksData.flavorText) {
      const utterance = new SpeechSynthesisUtterance(poksData.flavorText);
      speechSynthesis.cancel(); // Cancel any previous speech synthesis in progress
      speechSynthesis.speak(utterance);
    }
  }

  function handlesUrl() {
    window.open(poksData.tcgplayer.url);
  }

  return (
    <>
      <div className="overlay"></div>
      <h3 className="card-popup-content">CLICK ON THE CARD TO FIND OUT MORE</h3>
      <div className="card-popup">
        <>
          <img
            id="largeSize"
            src={poksData.images.large}
            alt={poksData.name}
            onClick={handlesUrl}
          />
          <h1>{poksData.flavorText}</h1>
        </>
        <div className="allbtns">
          <Button
            variant="contained"
            className="close-button"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            variant="contained"
            className="playbtn"
            onClick={readFlavorText}
          >
            Play me
          </Button>
        </div>
      </div>
    </>
  );
}

export default CardPopup;
