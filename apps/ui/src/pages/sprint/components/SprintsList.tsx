import { Box, Grid, Typography } from '@mui/material';
import { SprintCard } from './SprintCard';

const SprintsList = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Sprints
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <SprintCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SprintCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SprintCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export { SprintsList };
