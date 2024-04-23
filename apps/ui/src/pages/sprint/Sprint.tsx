import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { SprintSettings, SprintsList, TimeLeft } from './components';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Sprint = () => {
  return (
    <Box sx={{ flexGrow: 1, margin: 3 }}>
      <Box>
        <Typography variant="h3" gutterBottom>
          Welcome back, Anika
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Nice progress so far, keep it!
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={8}>
          <Item>
            <TimeLeft />
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <SprintSettings />
          </Item>
        </Grid>
      </Grid>
      <Box>
        <SprintsList />
      </Box>
    </Box>
  );
};

export { Sprint };
