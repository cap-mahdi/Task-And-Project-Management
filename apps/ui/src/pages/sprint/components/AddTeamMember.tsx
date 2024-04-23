import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';

const AddTeamMember = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <PostAddIcon />
        </Grid>
        <Grid item xs={11}>
          <Typography gutterBottom variant="h5">
            Schedule a Sprint
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Browse through the directory.
          </Typography>
          <Button variant="contained" color="success">
            Add a sprint
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export { AddTeamMember };
