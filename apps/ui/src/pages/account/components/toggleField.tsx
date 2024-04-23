import { Card, CardContent, Grid, Switch, Typography } from '@mui/material';

interface ToggleFieldProps {
  title: string;
  description: string;
}
export function ToggleField({ title, description }: ToggleFieldProps) {
  return (
    <Grid container>
      <Grid item sx={{ width: '90%' }}>
        <Card sx={{ boxShadow: 'none' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: 'inherit' }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey' }}>
              {description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        item
        sx={{
          width: '10%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Switch />
      </Grid>
    </Grid>
  );
}
