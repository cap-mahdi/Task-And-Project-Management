import { Card, Grid, Typography, Box } from '@mui/material';
import { CustomInputField } from './components/customInputField';
import { useState } from 'react';

export function SecuritySettings() {
  const [password, setPassword] = useState('');

  const onChange = (password: string) => setPassword(password);

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
            Change password
          </Typography>
        </Grid>
        <Grid item sx={{ width: '70%' }}>
          <Box sx={{ mb: 2 }}>
            <CustomInputField
              title={'Password'}
              value={password}
              type={'password'}
              onChange={onChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
