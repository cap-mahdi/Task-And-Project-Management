import { Box, Card } from '@mui/material';
import { BasicDetails } from './sections/basicDetails';
import { DeleteAccount } from './sections/deleteAccount';
import { PublicProfileSettings } from './sections/publicProfileSettings';
import { SxPropsObject } from '../../utils/sxPropsObject';

export function GeneralSettings() {
  const styles: SxPropsObject = {
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 2,
      pt: 1,
      px: 2,
      borderRadius: 2,
    },
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        py: 2,
        px: 2,

        borderRadius: 2,
      }}
    >
      <Card sx={styles.card}>
        <BasicDetails />
      </Card>
      <Card sx={styles.card}>
        <PublicProfileSettings />
      </Card>
      <Card sx={styles.card}>
        <DeleteAccount />
      </Card>
    </Box>
  );
}
