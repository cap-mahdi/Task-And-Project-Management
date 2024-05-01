import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

export function Sponsors() {
  const [sponsorImages, setSponsorImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchSponsorImages = () => {
      const files = import.meta.glob('../../../../public/sponsors/*', {
        eager: true,
      });

      setSponsorImages(Object.keys(files));
    };

    fetchSponsorImages();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      {sponsorImages.map((image, index) => (
        <Grid item key={index}>
          <img
            src={image}
            alt={'sponsor'}
            style={{
              width: '5rem',
              height: '3rem',
            }}
          />
        </Grid>
      ))}
    </Box>
  );
}
