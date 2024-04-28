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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        pt: '1rem',
        width: '17vw',
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
    >
      <CardContent
        sx={{
          padding: 0,
        }}
      >
        {icon}
      </CardContent>

      <CardContent
        sx={{
          padding: 0,
        }}
      >
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
