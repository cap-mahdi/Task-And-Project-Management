import {
  Button,
  Card,
  CardContent,
  Box,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useCustomMutation } from '../../../hooks/useCustomMutation';
import { UPDATE_USERS } from '../../../services/user/updateUser';
import { useUser } from '../../../services';

interface CustomInputFieldProps {
  name: 'name' | 'email' | 'phone';
  title: string;
  value: string;
  type?: 'text' | 'email' | 'tel' | 'role' | 'password';
  onChange: (value: string) => void;
}

interface UpdateUserInput {
  name?: string;
  email?: string;
  phone?: string;
}

export function CustomInputField({
  name,
  title,
  value,
  type,
  onChange,
}: CustomInputFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateUser, { data, error, loading }] = useCustomMutation(
    UPDATE_USERS,
    true
  );

  const handleEditClick = async () => {
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
    if (isEditing) {
      const updateUserData: UpdateUserInput = {};
      updateUserData[name] = value;
      await updateUser({ variables: { input: updateUserData } });
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
            // height: 'fit-content',
          }}
        >
          <CardContent
            sx={
              {
                // height: '10rem',
              }
            }
          >
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
                sx={{
                  '& input': {
                    height: '0.8rem',
                    width: '100%',
                    fontSize: '0.8rem',
                    '&:focus': {
                      // Add focus styles here
                    },
                    '&:hover': {
                      // Add hover styles here
                    },
                    // Add more state styles as needed
                  },
                }}
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
