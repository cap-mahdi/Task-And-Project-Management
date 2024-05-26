import React from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

// Define the keyframes for the animation
const animateRoad = keyframes`
  0% {
    background-position: 0px;
  }
  100% {
    background-position: -120px;
  }
`;

const Road = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        zIndex: '-1',
      }}
    >
      <Box
        sx={{
          width: '100vw',
          zIndex: '-1',
          height: '200px',
          backgroundColor: '#353535',
          transformStyle: 'preserve-3d',
          // transform: 'perspective(20rem) rotateX(30deg)',
          position: 'relative',
          borderRadius: '10px',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            //   transform: 'translateY(-50%)',
            left: 0,
            width: '100%',
            height: '10px',
            background:
              'linear-gradient(90deg, #fff 0%, #fff 70%, #353535 70%, #353535 100%)',
            backgroundSize: '120px',
            animation: `${animateRoad} 0.5s linear infinite`,
          },
        }}
      >
        <Box
          sx={{
            color: '#fff',
            padding: '1rem',
            pl: '12%',
            letterSpacing: '1px',
          }}
        >
          ⚠ Get Back on track.
        </Box>
      </Box>
    </Box>
  );
};

export default Road;
