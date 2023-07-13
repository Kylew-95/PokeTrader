import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ pokeData }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(pokeData?.name);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 20,
        position: "absolute",
        zIndex: "20",
        margin: "0 auto",
        left: "0",
        height: "4dvh",
        color: "white",
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search"
        variant="filled"
        value={searchTerm}
        onChange={handleChange}
        sx={{
          width: 600,
          backgroundColor: "white",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}
