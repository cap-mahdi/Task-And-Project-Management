import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Box, Stack } from '@mui/material';
import { LinearProgressWithValueLabel } from '../../../components';

const SprintCard = () => {
  return (
    <Card
      sx={{
        boxShadow: 'none',
        border: '1px solid #f0f0f0',
        borderRadius: 4,
        padding: 2,
      }}
    >
      {/* <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <AccessTimeIcon />
          <Typography variant="body2" color="text.secondary">
            2h 30m
          </Typography>
        </Stack>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithValueLabel value={50} />
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button size="small">See More</Button>
      </CardActions> */}
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum eligendi
      quas natus vel beatae aspernatur rem aperiam quod? Doloremque tenetur illo
      repellendus ut iure perferendis eius quibusdam! Voluptatibus, similique
      eum.
    </Card>
  );
};

export { SprintCard };
