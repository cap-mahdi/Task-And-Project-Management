import { Card, CardContent, CardMedia } from '@mui/material';
import Description from './description';
import GetStartedButton from './getStartedButton';

interface FeatureCardProps {
  imgUrl: string;
  buttonColor: string;
  title: {
    text: string;
    color: string;
  };
  description: {
    text: string;
    color: string;
  };
}

export function FeatureCard({
  imgUrl,
  buttonColor,
  title,
  description,
}: FeatureCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        width: '60vw',
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <CardMedia
        component="img"
        image={imgUrl}
        alt="image"
        sx={{ width: '25vw', objectFit: 'cover', marginRight: '50px' }}
      />
      <CardContent sx={{ width: '35vw' }}>
        <Description title={title} description={description}></Description>
        <GetStartedButton buttonColor={buttonColor}></GetStartedButton>
      </CardContent>
    </Card>
  );
}

export default FeatureCard;
