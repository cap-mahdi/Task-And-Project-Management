import { Card, Box, Typography } from '@mui/material';
import { CustomInputField } from './components/customInputField';
import { useState } from 'react';

export function SecuritySettings() {
  const [password, setPassword] = useState('');

  const onChange = (password: string) => setPassword(password);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
        pt: 1,
        px: 2,
        mt: 2,
        mx: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Box sx={{ width: '30%', fontSize: '16px' }}>
          <Typography fontWeight={'bold'}>Change password</Typography>
        </Box>
        <Box sx={{ width: '70%' }}>
          <Box sx={{ mb: 2 }}>
            <CustomInputField
              title={'Password'}
              value={password}
              type={'password'}
              onChange={onChange}
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
