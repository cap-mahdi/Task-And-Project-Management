import { Button } from '@mui/material';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

interface GetStartedButtonProps {
  buttonColor: string;
}

export function GetStartedButton({ buttonColor }: GetStartedButtonProps) {
  return (
    <Button
      color="secondary"
      href="#"
      endIcon={<ArrowForwardIcon />}
      sx={{ textTransform: 'none', color: buttonColor }}
    >
      Get Started
    </Button>
  );
}
