import { Box, Button, Grid, Typography } from '@mui/material';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

const ScheduleSprint = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={1}>
          <PersonAddOutlinedIcon />
        </Grid>
        <Grid item xs={11}>
          <Typography gutterBottom variant="h5">
            Add team members
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Browse through the directory.
          </Typography>
          <Button variant="contained" color="success">
            Collaborate
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export { ScheduleSprint };
