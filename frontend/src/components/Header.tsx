import {
  Box,
  IconButton,
  Typography,
  Sheet,
  Container
} from "@mui/joy";
import GitHubIcon from "@mui/icons-material/GitHub";
import { InfoPopover } from "./InfoPopover";
import { Settings } from "./Settings";
import logo from "../radis.png";
import { useColorScheme } from '@mui/joy/styles';
import LightModeIcon from "@mui/icons-material/LightMode"; // Sun
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const Header: React.FC = () => {
  const { mode, setMode } = useColorScheme();
  return (
    <Sheet
      variant="plain"
      sx={{
        borderBottom: "1px solid #ccc",
        backgroundColor: mode === "dark" ? "#272727" : "white",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <img src={logo} height={50} alt="Radish logo" />
            <Typography level="h4" sx={{ fontWeight: 1000, color: mode === "dark" ? "white" : "black" }}>
              Radis App
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              variant="plain"
              onClick={() =>
                (window.location.href = "https://github.com/suzil/radis-app")
              }
            >
              <GitHubIcon sx={{ color: mode === "dark" ? "white" : "", fontSize: 28 }} />
            </IconButton>
            <IconButton
              onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
            >
              {mode === "dark" ? (
                <DarkModeIcon />
              ) : (
                <LightModeIcon />
              )}
            </IconButton>
            <Settings />
            <InfoPopover />
          </Box>
        </Box>
      </Container>
    </Sheet>
  );
};
