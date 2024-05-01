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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
      }}
    >
      <Box sx={{ width: '30%', fontSize: '16px' }}>
        <Typography fontWeight={'bold'}>{option}</Typography>
      </Box>
      <Box sx={{ width: '70%' }}>
        {settings.map((setting, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <ToggleField
              title={setting.title}
              description={setting.description}
            />
            {index < settings.length - 1 && <Divider sx={{ my: 1 }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
