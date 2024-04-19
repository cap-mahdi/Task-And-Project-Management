import { Box } from "@mui/material";
import { BasicDetails } from "./sections/basicDetails";
import { DeleteAccount } from "./sections/deleteAccount";
import { PublicProfileSettings } from "./sections/publicProfileSettings";

export function GeneralSettings() {
  return (
    <>
      <Box sx={{ my: 5 }}>
        <BasicDetails />
      </Box>
      <Box sx={{ my: 5 }}>
        <PublicProfileSettings />
      </Box>
      <Box sx={{ my: 5 }}>
        <DeleteAccount />
      </Box>
    </>
  );
}
