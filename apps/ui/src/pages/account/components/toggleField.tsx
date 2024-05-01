import {
  Box,
  Card,
  CardContent,
  Grid,
  Switch,
  Typography,
} from '@mui/material';

interface ToggleFieldProps {
  title: string;
  description: string;
}
export function ToggleField({ title, description }: ToggleFieldProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '90%' }}>
        <Card sx={{ boxShadow: 'none' }}>
          <CardContent>
            <Typography sx={{ color: 'inherit', fontSize: '16px' }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey' }}>
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          // bgcolor: 'red',
          width: '10%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Switch />
      </Box>
    </Box>
  );
}
