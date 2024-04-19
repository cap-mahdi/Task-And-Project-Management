import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface CustomInputFieldProps {
  title: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'role' | 'password';
  onChange: (value: string) => void;
}

export function CustomInputField({
  title,
  value,
  type,
  onChange,
}: CustomInputFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleEditClick = () => {
    if (isEditing) {
      if (type === 'email') {
        const validEmail = /\S+@\S+\.\S+/.test(value);
        if (!validEmail) {
          setErrorMessage('Email is invalid');
          return;
        }
      } else if (type === 'tel') {
        const validPhoneNumber = /^\d{8}$/.test(value);
        if (!validPhoneNumber) {
          setErrorMessage('Phone number is invalid');
          return;
        }
      }
      setErrorMessage('');
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Grid container>
      <Grid item sx={{ width: '90%' }}>
        <Card sx={{ boxShadow: 'none', border: '1px solid #e0e0e0' }}>
          <CardContent>
            <Typography
              variant="body1"
              sx={{ color: isEditing ? 'inherit' : 'grey' }}
            >
              {title}
            </Typography>

            {isEditing ? (
              <TextField
                type={type === 'email' || type === 'tel' ? 'text' : type}
                value={value}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                placeholder="Enter text"
              ></TextField>
            ) : (
              <Typography variant="h6" sx={{ color: 'grey' }}>
                {value || 'Press Edit to enter info'}
              </Typography>
            )}

            {errorMessage && (
              <Typography variant="body2" sx={{ color: 'red' }}>
                {errorMessage}
              </Typography>
            )}
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
        <Button
          variant="text"
          onClick={handleEditClick}
          sx={{ color: 'black' }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </Grid>
    </Grid>
  );
}
