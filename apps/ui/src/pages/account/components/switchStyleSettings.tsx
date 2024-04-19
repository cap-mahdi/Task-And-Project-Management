import { Card, Grid, Typography, Box, Divider } from '@mui/material';
import { ToggleField } from './toggleField';

interface Setting {
  title: string;
  description: string;
}

interface SwitchStyleSettingsProps {
  option: string;
  settings: Setting[];
}

export function SwitchStyleSettings({
  option,
  settings,
}: SwitchStyleSettingsProps) {
  return (
    <Card
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
      }}
    >
      <Grid container>
        <Grid item sx={{ width: '30%' }}>
          <Typography variant="h5" fontWeight={'bold'}>
            {option}
          </Typography>
        </Grid>
        <Grid item sx={{ width: '70%' }}>
          {settings.map((setting, index) => (
            <Box key={index} sx={{ mb: 2 }}>
              <ToggleField
                title={setting.title}
                description={setting.description}
              />
              {index < settings.length - 1 && <Divider sx={{ my: 1 }} />}
            </Box>
          ))}
        </Grid>
      </Grid>
    </Card>
  );
}
