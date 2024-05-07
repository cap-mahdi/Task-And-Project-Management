import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../services/auth';
import { Box, CircularProgress } from '@mui/material';
import useAppContext from '../context/useAppContext';

export function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [globalState, setGlobalState] = useAppContext();

  const { user, error, getUser, isLoading } = useUser();
  useEffect(
    function () {
      if (!user && !isLoading) {
        localStorage.removeItem('token');

        navigate('/login');
      }
    },
    [user, isLoading, navigate, setGlobalState]
  );

  useEffect(() => {
    if (user && !error) {
      setGlobalState((prevState) => ({
        ...prevState,
        user: user.getConnectedUser,
      }));
    }
  }, [user, setGlobalState, error]);
  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          height: '100vh',
          width: '100vw',
          bgcolor: (theme) => theme.palette.lightGray.main,
        }}
      >
        <CircularProgress disableShrink />
      </Box>
    );

  if (user) return children;
}
