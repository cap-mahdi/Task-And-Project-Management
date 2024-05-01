import { useTheme } from '@emotion/react';
import { Box, Container } from '@mui/material';
import { InvertedFeatureCard } from '../components';

export function FirstSection() {
  const customTheme = useTheme();
  const backgroundColor = customTheme.palette.blackPearl.main;
  const contrastColor = customTheme.palette.albescentWhite.main;

  const title = {
    text: 'This is description title.',
    color: '#FFFFFF',
  };

  const description = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    color: '#979797',
  };

  const imgUrl = 'https://3back.com/app/uploads/2017/07/Team-scaled.jpg';

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: backgroundColor,
        paddingTop: '20vh',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '75%',
        }}
      >
        <InvertedFeatureCard
          imgUrl={imgUrl}
          buttonColor={contrastColor}
          title={title}
          description={description}
        ></InvertedFeatureCard>
      </Box>
    </Container>
  );
}
