import { useTheme } from '@emotion/react';
import { Box, Container } from '@mui/material';
import { InvertedFeatureCard } from '../components';

export function FirstSection() {
  const customTheme = useTheme();
  const backgroundColor = customTheme.palette.blackPearl.main;
  const contrastColor = customTheme.palette.albescentWhite.main;

  const title = {
    text: 'Simplify task management and take control of your day.',
    color: '#FFFFFF',
  };

  const description = {
    text: "TeamFlow is designed to make your life easier by providing a multitude of tools to organize and track your tasks efficiently. Whether you're managing personal to-dos or coordinating complex team projects, our app provides a wide range of functionalities to help you stay on top of your workloads.",
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
