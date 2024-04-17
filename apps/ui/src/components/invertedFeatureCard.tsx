import { Card, CardContent, CardMedia } from '@mui/material';
import Description from './description';
import GetStartedButton from './getStartedButton';

interface InvertedFeatureCardProps {
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

export function InvertedFeatureCard({
  imgUrl,
  buttonColor,
  title,
  description,
}: InvertedFeatureCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        width: '60vw',
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <CardContent sx={{ width: '35vw' }}>
        <Description title={title} description={description}></Description>
        <GetStartedButton buttonColor={buttonColor}></GetStartedButton>
      </CardContent>
      <CardMedia
        component="img"
        image={imgUrl}
        alt="image"
        sx={{ width: '25vw', objectFit: 'cover', marginRight: '50px' }}
      />
    </Card>
  );
}

export default InvertedFeatureCard;
