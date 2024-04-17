import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

interface VisitByCountryProps {
  title: string;
  subheader: string;
}

const VisitByCountry = ({
  title,
  subheader,
  ...other
}: VisitByCountryProps) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ mx: 3 }}>
        {/* <Chart
          dir="ltr"
          type="bar"
          series={[{ data: chartSeries }]}
          options={chartOptions}
          width="100%"
          height={364}
        /> */}
      </Box>
    </Card>
  );
};

export { VisitByCountry };
