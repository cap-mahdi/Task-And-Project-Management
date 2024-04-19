import { Card, CardContent, TypographyProps } from '@mui/material';
import { Description } from '.';
import { FC } from 'react';

interface MiniFeatureCardProps {
  title: {
    text: string;
    color: string;
  };
  description: {
    text: string;
    color: string;
  };

  titleVariant?: TypographyProps['variant'];

  descriptionVariant?: TypographyProps['variant'];

  icon: JSX.Element;
}

export const MiniFeatureCard: FC<MiniFeatureCardProps> = ({
  title,
  description,
  titleVariant,
  descriptionVariant,
  icon,
}) => {
  return (
    <Card
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '20vw',
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <CardContent>{icon}</CardContent>

      <CardContent>
        <Description
          title={title}
          description={description}
          titleVariant={titleVariant}
          descriptionVariant={descriptionVariant}
        ></Description>
      </CardContent>
    </Card>
  );
};
