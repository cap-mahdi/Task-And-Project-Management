import { Card, CardContent, CardMedia } from '@mui/material';
import { Description, GetStartedButton } from '.';
import { FC } from 'react';

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

export const FeatureCard: FC<FeatureCardProps> = ({
  imgUrl,
  buttonColor,
  title,
  description,
}) => {
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
};
