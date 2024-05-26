import { Box, Button, Typography } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { theme } from '../../../theme';
import { Link } from 'react-router-dom';

interface GetStartedButtonProps {
  buttonColor: string;
}

export function GetStartedButton({ buttonColor }: GetStartedButtonProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        cursor: 'pointer',
        '&:hover': {
          color: theme.palette.albescentWhite.main,
        },
      }}
    >
      <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Typography
          href="#"
          sx={{
            textTransform: 'none',
            color: buttonColor,
            fontWeight: 'medium',
          }}
        >
          Get Started
        </Typography>
      </Link>
      <ArrowForwardIcon
        sx={{
          color: (theme) => theme.palette.albescentWhite.main,
        }}
      />
    </Box>
  );
}
