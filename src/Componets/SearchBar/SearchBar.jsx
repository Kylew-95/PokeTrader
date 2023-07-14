import { Container, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./SearchBar.css";

export default function SearchBar({ handleSearch, searchTerm }) {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        mt: 20,
        position: "absolute",
        zIndex: "20",
        margin: "0 auto",
        left: "0",
        height: "4dvh",
        color: "white",
        width: 300,
        // eslint-disable-next-line no-dupe-keys
        height: 50,
      }}
    >
      <TextField
        id="search"
        type="search"
        label="Search"
        variant="filled"
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 300,
          backgroundColor: "white",
          borderRadius: 10,
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
