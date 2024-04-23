import { Box, Typography } from '@mui/material';
import React from 'react';
import { StyledButton } from './StyledButton';
import { PencilIcon } from '@heroicons/react/24/outline';

export function TitleAndButton({ sectionName, ButtonText, disableButton }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        my: 1,
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '90%',
        }}
      >
        {sectionName}
      </Typography>

      {!disableButton ? (
        <PencilIcon
          style={{
            height: '1rem',
          }}
        />
      ) : (
        ''
      )}
    </Box>
  );
}
