import React, { useState, useEffect, useRef } from "react";
import "./NavBar.css";
import pikaIcon from "../Images/pikachu icon.png";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const pages = ["Home", "GymLeaders", "Forum"];
const settings = ["Profile", "Settings"];

function ResponsiveNavBar({ user, pokeData }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [transparency, setTransparency] = useState("rgba(240, 248, 255, 0)");

  const navRef = useRef();
  navRef.current = transparency;

  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 300;
      if (show) {
        setTransparency("rgb(253,208,0)");
      } else {
        setTransparency("rgba(240, 248, 255, 0)");
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //
  const handleUpperCase = (user) => {
    const userAvatar = user.user_metadata.full_name;
    return userAvatar.toUpperCase();
  };

  return (
    <>
      <AppBar
        className={transparency}
        position="fixed"
        style={{
          backgroundColor: transparency,
          boxShadow: "none",
          transition: "background-color 0.3s ease",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to={"/"}>
              <img src={pikaIcon} alt="pikachu icon" className="pikaIcon" />
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TraderRaider
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-NavBar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-NavBar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {page === "Home" ? (
                        <Link to={"/"}>{page}</Link>
                      ) : (
                        <Link to={`/${page}`}>{page}</Link>
                      )}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontSize: "18px",
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              TraderRaider
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={page === "Home" ? "/" : `/${page}`}
                  >
                    {page}
                  </Link>
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    sx={{ width: 32, height: 32, bgcolor: "orange" }}
                    alt={
                      user ? handleUpperCase(user) : "User is not logged in yet"
                    }
                    src={"/static/images/avatar/1.jpg"}
                  />
                </IconButton>
              </Tooltip>
              {user ? (
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                    color: "blue",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        <Link
                          style={{ textDecoration: "none", color: "black" }}
                          to={`${setting}`}
                        >
                          {setting}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              ) : null}
              {!user && (
                <Link to={`/Login`}>
                  <Button sx={{ left: "1vw" }} variant="contained">
                    Login
                  </Button>
                </Link>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default ResponsiveNavBar;
