import { Box, Button, Typography } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { theme } from '../../../theme';

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
      <Typography
        href="#"
        sx={{ textTransform: 'none', color: buttonColor, fontWeight: 'medium' }}
      >
        Get Started
      </Typography>
      <ArrowForwardIcon
        sx={{
          color: (theme) => theme.palette.albescentWhite.main,
        }}
      />
    </Box>
  );
}
