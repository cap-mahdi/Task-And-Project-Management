import { Box, Input, useTheme } from '@mui/material';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRef } from 'react';

export default function Search({
  width = 270,
  mb = 2,
  mt = 0,
  mr = 0,
  ml = 0,
}) {
  const theme = useTheme();
  const { palette } = theme;
  const searchWord = useRef('');
  return (
    <Box
      sx={{
        bgcolor: palette.gray.main,
        height: 40,
        px: 1,
        borderRadius: 2,
        mb,
        mt,
        ml,
        mr,
      }}
      display={'flex'}
      flex={'row'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      gap={1}
    >
      <MagnifyingGlassIcon width={'20'} />
      <Input
        sx={{
          color: palette.blackPearl.main,
        }}
        placeholder="Search"
        disableUnderline
        ref={searchWord}
      />
    </Box>
  );
}
