import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

export function Sponsors() {
  const [sponsorImages, setSponsorImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchSponsorImages = () => {
      const files = import.meta.glob('../..//public/sponsors/*', {
        eager: true,
      });

      setSponsorImages(Object.keys(files));
    };

    fetchSponsorImages();
  }, []);

  return (
    <Grid container spacing={8} justifyContent={'center'}>
      {sponsorImages.map((image, index) => (
        <Grid item key={index}>
          <img
            src={image}
            alt={'sponsor'}
            style={{ width: '100px', height: '100px' }}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default Sponsors;
