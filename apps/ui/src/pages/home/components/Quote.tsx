import { FormatQuote as FormatQuoteIcon } from '@mui/icons-material';
import { Box, Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface QuoteProps {
  text: string;
  personName: string;
  job: string;
  textColor: string;
  backgroundColor: string;
}

export const Quote: FC<QuoteProps> = ({
  text,
  personName,
  job,
  textColor,
  backgroundColor,
}) => {
  return (
    <Box
      container
      display="block"
      sx={{
        backgroundColor: backgroundColor,
        minWidth: '30%',
        pt: '1rem',
      }}
    >
      <Grid item>
        <FormatQuoteIcon fontSize="large" style={{ color: '#473BF0' }} />
      </Grid>

      <Grid item>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          maxWidth="300px"
          sx={{ color: textColor, overflowWrap: 'break-word' }}
        >
          {text}
        </Typography>
      </Grid>

      <Grid item>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            sx={{ color: textColor, marginRight: '1rem' }}
          >
            {personName}
          </Typography>

          <Typography variant="subtitle2" style={{ color: '#979797' }}>
            {job}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};
