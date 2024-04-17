import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

interface TrafficSourceProps {
  title: string;
  subheader: string;
}

const TrafficSource = ({ title, subheader, ...other }: TrafficSourceProps) => {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        {/* <Chart
          dir="ltr"
          type="line"
          series={series}
          options={chartOptions}
          width="100%"
          height={364}
        /> */}
      </Box>
    </Card>
  );
};

export { TrafficSource };
