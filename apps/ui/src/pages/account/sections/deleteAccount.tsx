import { Card, Grid, Typography, Button } from '@mui/material';

export function DeleteAccount() {
  return (
    <Card
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
      }}
    >
      <Grid container>
        <Grid item sx={{ width: '30%' }}>
          <Typography variant="h5" fontWeight={'bold'}>
            Public profile
          </Typography>
        </Grid>
        <Grid item sx={{ width: '70%' }}>
          <Typography variant="h6" sx={{ my: 5 }}>
            Delete your account and all of your source data. This is
            irreversible
          </Typography>

          <Button variant="outlined" color="error">
            Delete account
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
