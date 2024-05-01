import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';

const styles = {
  wrapper: {
    mt: 2,

    mb: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: (theme) => theme.palette.lightGray.main,
    gap: '10px',
    fontWeight: 300,
  },
  selectedStyle: {
    textDecoration: 'underline',
    textDecorationThickness: '1.5px',
    textDecorationOffset: '1px',
    color: (theme) => theme.palette.bismark.main,
  },
  hoverStyle: {
    transition: 'all 0.1s ease-in-out',
  },
  sectionStyle: {
    cursor: 'pointer',
    transition: 'all 0.1s ease-in-out',
  },
};

interface PropsType {
  sections: string[];
  uppercase: boolean;
  sx: object;
}

export function Sections({
  sections = ['Home', 'Categories', 'About us', 'Contact us'],
  uppercase = true,
  sx = {},
}: PropsType) {
  const [selected, setSelected] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <Box
      sx={{ ...styles.wrapper, ...sx }}
      onMouseLeave={() => {
        setHover(selected);
      }}
    >
      {sections.map((section, i) => (
        <Typography
          sx={{
            ...styles.sectionStyle,
            fontSize: 13,
            'text-underline-offset': '17px',
            ...(selected === i && hover === selected
              ? styles.selectedStyle
              : {}),
            ':hover': { ...styles.selectedStyle },
          }}
          onClick={() => {
            setSelected(i);
          }}
          onMouseEnter={() => {
            setHover(i);
          }}
        >
          {uppercase ? section : section}
        </Typography>
      ))}
    </Box>
  );
}
