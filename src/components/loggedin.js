import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

function LoggedInAppBar() {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              textAlign: "center",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MoTok
          </Typography>
          <Button
            sx={{
              p: 0,
              color: "white",
              textTransform: "none",
            }}
            onClick={() => signOut()}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default LoggedInAppBar;
