import Container from '@mui/material/Container';
import { Summary, TrafficSource, VisitByCountry } from './components';
import { Grid } from '@mui/material';

const Overview = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={4}>
          <Summary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Summary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} md={4}>
          <Summary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <TrafficSource
            title="Website Visits"
            subheader="(+43%) than last year"
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <VisitByCountry
            title="Conversion Rates"
            subheader="(+43%) than last year"
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <TrafficSource
            title="Website Visits"
            subheader="(+43%) than last year"
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          <VisitByCountry
            title="Conversion Rates"
            subheader="(+43%) than last year"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export { Overview };
