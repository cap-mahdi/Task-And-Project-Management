import { Typography } from '@mui/material';
import { TypographyProps } from '@mui/material/Typography';
import { FC } from 'react';

interface DescriptionProps {
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
}

export const Description: FC<DescriptionProps> = ({
  title,
  description,
  titleVariant,
  descriptionVariant,
}) => {
  return (
    <div>
      <Typography
        variant={titleVariant ? titleVariant : 'h4'}
        fontWeight="bold"
        gutterBottom
        sx={{ color: title.color }}
      >
        {title.text}
      </Typography>

      <Typography
        variant={descriptionVariant ? descriptionVariant : 'subtitle1'}
        gutterBottom
        style={{ color: description.color }}
      >
        {description.text}
      </Typography>
    </div>
  );
};
