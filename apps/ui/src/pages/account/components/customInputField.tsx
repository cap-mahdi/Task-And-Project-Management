import {
  Button,
  Card,
  CardContent,
  Box,
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '90%' }}>
        <Card
          sx={{
            boxShadow: 'none',
            border: '1px solid #e0e0e0',
            height: '3.5rem',
          }}
        >
          <CardContent>
            <Typography
              sx={{ color: isEditing ? 'inherit' : 'grey', fontSize: '0.7rem' }}
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
                sx={{ fontSize: '0.8rem' }}
                placeholder="Enter text"
              ></TextField>
            ) : (
              <Typography sx={{ color: 'grey', fontSize: '0.8rem' }}>
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
      </Box>
      <Box
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
      </Box>
    </Box>
  );
}
