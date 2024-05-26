import { Card, Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useCustomMutation } from '../../hooks/useCustomMutation';
import { CHANGE_PASSWORD } from '../../services/user';

export function SecuritySettings() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changePassword, { data, error, loading }] = useCustomMutation(
    CHANGE_PASSWORD,
    true
  );

  const onChange = (password: string) => setPassword(password);

  const handleChangePassword = async () => {
    const changePasswordInput = {
      oldPassword,
      newPassword: password,
      confirmPassword,
    };
    await changePassword({ variables: { input: changePasswordInput } });

    setOldPassword('');
    setPassword('');
    setConfirmPassword('');
  };

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
        pb: 2,
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
          <TextField
            autoFocus
            required
            margin="dense"
            id="oldPassword"
            name="oldPassword"
            label="Old Password"
            fullWidth
            variant="standard"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="New Password"
            fullWidth
            variant="standard"
            type="password"
            value={password}
            onChange={(e) => onChange(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            variant="standard"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          onClick={handleChangePassword}
          variant="contained"
          sx={{
            padding: '10px 5px',
            borderRadius: 2,
          }}
          disabled={
            !oldPassword ||
            !password ||
            !confirmPassword ||
            password !== confirmPassword
          }
        >
          Change Password
        </Button>
      </Box>
    </Card>
  );
}
