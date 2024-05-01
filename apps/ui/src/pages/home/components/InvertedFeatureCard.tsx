import { Card, CardContent, CardMedia } from '@mui/material';
import { Description, GetStartedButton } from '.';
import { FC } from 'react';

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

export const InvertedFeatureCard: FC<InvertedFeatureCardProps> = ({
  imgUrl,
  buttonColor,
  title,
  description,
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'space-between',

        width: '100%',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        borderRadius: '0.5rem',
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
        sx={{
          width: '20vw',
          maxHeight: '30vw',
          objectFit: 'fill',

          borderRadius: '0.8rem',
        }}
      />
    </Card>
  );
};
