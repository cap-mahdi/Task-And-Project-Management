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
    <Grid
      container
      display="block"
      spacing={2}
      style={{ backgroundColor: backgroundColor }}
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
          style={{ color: textColor, overflowWrap: 'break-word' }}
        >
          {text}
        </Typography>
      </Grid>

      <Grid item>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="subtitle2"
            fontWeight="bold"
            style={{ color: textColor, marginRight: '1rem' }}
          >
            {personName}
          </Typography>

          <Typography variant="subtitle2" style={{ color: '#979797' }}>
            {job}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
