import { Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

interface LinkableCaptionProps {
  caption: string;
  linkText: string;
  linkPath: string;
}
export const LinkableCaption: FC<LinkableCaptionProps> = ({
  caption,
  linkText,
  linkPath,
}) => {
  return (
    <Typography sx={{ fontSize: 12 }}>
      {caption}{' '}
      <Link to={linkPath}>
        <Typography
          sx={{
            display: 'inline-block',
            color: 'primary.main',
            cursor: 'pointer',
            fontSize: 12,
          }}
        >
          {linkText}
        </Typography>
      </Link>
    </Typography>
  );
};
