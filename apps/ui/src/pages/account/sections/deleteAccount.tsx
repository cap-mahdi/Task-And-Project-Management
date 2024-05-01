import { Card, Grid, Typography, Button, Box } from '@mui/material';

export function DeleteAccount() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        pb: 1,
      }}
    >
      <Box sx={{ width: '30%', fontSize: '16px' }}>
        <Typography fontWeight={'bold'}>Public profile</Typography>
      </Box>
      <Box sx={{ width: '70%', pl: 2 }}>
        <Typography sx={{ my: 5 }}>
          Delete your account and all of your source data. This is irreversible
        </Typography>

        <Button variant="outlined" color="error">
          Delete account
        </Button>
      </Box>
    </Box>
  );
}
