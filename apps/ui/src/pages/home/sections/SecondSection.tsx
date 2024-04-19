import { useTheme } from '@emotion/react';
import { Container, Grid, TypographyProps } from '@mui/material';
import {
  ViewComfy as ViewComfyIcon,
  AutoGraph as AutoGraphIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import {
  FeatureCard,
  InvertedFeatureCard,
  MiniFeatureCard,
  Sponsors,
} from '../components';

export function SecondSection() {
  const customTheme = useTheme();

  const backgroundColor = customTheme.palette.albescentWhite.main;
  const contrastColor = customTheme.palette.blackPearl.main;
  const buttonColor = customTheme.palette.bismark.main;

  const miniFeatures = [
    {
      title: {
        text: 'Feature 1',
        color: contrastColor,
      },
      description: {
        text: 'This is a feature description',
        color: '#979797',
      },
      titleVariant: 'h6' as TypographyProps['variant'],
      descriptionVariant: 'subtitle2' as TypographyProps['variant'],
      icon: <ViewComfyIcon fontSize="large" style={{ color: buttonColor }} />,
    },

    {
      title: {
        text: 'Feature 2',
        color: contrastColor,
      },
      description: {
        text: 'This is a feature description',
        color: '#979797',
      },
      titleVariant: 'h6' as TypographyProps['variant'],
      descriptionVariant: 'subtitle2' as TypographyProps['variant'],
      icon: <AutoGraphIcon fontSize="large" style={{ color: buttonColor }} />,
    },

    {
      title: {
        text: 'Feature 3',
        color: contrastColor,
      },
      description: {
        text: 'This is a feature description',
        color: '#979797',
      },
      titleVariant: 'h6' as TypographyProps['variant'],
      descriptionVariant: 'subtitle2' as TypographyProps['variant'],
      icon: <PersonIcon fontSize="large" style={{ color: buttonColor }} />,
    },
  ];

  const features = [
    {
      title: {
        text: 'Feature 1',
        color: contrastColor,
      },
      description: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        color: '#979797',
      },
      buttonColor: buttonColor,
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      title: {
        text: 'Feature 2',
        color: contrastColor,
      },
      description: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        color: '#979797',
      },
      buttonColor: buttonColor,
      imgUrl: 'https://via.placeholder.com/150',
    },
    {
      title: {
        text: 'Feature 3',
        color: contrastColor,
      },
      description: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        color: '#979797',
      },
      buttonColor: buttonColor,
      imgUrl: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <Container
      maxWidth={false}
      style={{
        display: 'block',
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Sponsors />
      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        style={{ marginTop: '8rem' }}
      >
        {miniFeatures.map((miniFeature, index) => (
          <Grid item key={index}>
            <MiniFeatureCard
              title={miniFeature.title}
              description={miniFeature.description}
              titleVariant={miniFeature.titleVariant}
              descriptionVariant={miniFeature.descriptionVariant}
              icon={miniFeature.icon}
            ></MiniFeatureCard>
          </Grid>
        ))}
      </Grid>

      <Grid
        container
        spacing={2}
        justifyContent={'center'}
        style={{ marginTop: '8rem' }}
      >
        {features.map((feature, index) => (
          <Grid
            item
            key={index}
            style={{ marginBottom: '8rem', height: '60vh' }}
          >
            {index % 2 === 0 ? (
              <FeatureCard
                imgUrl={feature.imgUrl}
                buttonColor={feature.buttonColor}
                title={feature.title}
                description={feature.description}
              />
            ) : (
              <InvertedFeatureCard
                imgUrl={feature.imgUrl}
                buttonColor={feature.buttonColor}
                title={feature.title}
                description={feature.description}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
