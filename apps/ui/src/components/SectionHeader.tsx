import React from 'react';
import { Sections } from './Sections';
import { Box, Divider, Typography } from '@mui/material';

interface SectionHeaderProps {
  data: {
    sectionTitle: string;
    sections: {
      title: string;
      link: string;
      enableLink: boolean;
      onSelected: () => void;
    }[];
  };
}

export function SectionHeader({ data }: SectionHeaderProps) {
  return (
    <Box
      sx={{
        pt: 2,
        pb: '1px',
        position: 'fixed',
        backgroundColor: 'white',
        width: '100%',
        zIndex: 1000,
        boxShadow: 'none',
        px: 2,
        border: 'none',
        borderRadius: 0,
      }}
    >
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 'bold',
          mb: 3,
        }}
      >
        {data.sectionTitle}
      </Typography>
      <Sections sections={data.sections} />
      <Divider />
    </Box>
  );
}
