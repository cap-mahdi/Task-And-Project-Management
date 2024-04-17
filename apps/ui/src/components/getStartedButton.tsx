// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

export default GetStartedButton;
