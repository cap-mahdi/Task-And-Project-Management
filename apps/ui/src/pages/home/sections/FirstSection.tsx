import { useTheme } from '@emotion/react';
import { Container } from '@mui/material';
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

  const imgUrl = 'https://via.placeholder.com/150';

  return (
    <Container
      maxWidth={false}
      style={{
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <InvertedFeatureCard
        imgUrl={imgUrl}
        buttonColor={contrastColor}
        title={title}
        description={description}
      ></InvertedFeatureCard>
    </Container>
  );
}
