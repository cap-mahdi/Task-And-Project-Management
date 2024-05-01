import { useTheme } from '@emotion/react';
import { Box, Container, Grid, TypographyProps } from '@mui/material';
import {
  ViewComfy as ViewComfyIcon,
  AutoGraph as AutoGraphIcon,
  Person as PersonIcon,
  WidthFull,
} from '@mui/icons-material';
import {
  FeatureCard,
  InvertedFeatureCard,
  MiniFeatureCard,
  Sponsors,
} from '../components';
import { SxPropsObject } from '../../../utils/sxPropsObject';

export function SecondSection() {
  const customTheme = useTheme();

  const backgroundColor = customTheme.palette.albescentWhite.main;
  const contrastColor = customTheme.palette.blackPearl.main;
  const buttonColor = customTheme.palette.bismark.main;
  const featureDescriptionColor = '#031926b6';

  const miniFeatures = [
    {
      title: {
        text: 'Feature 1',
        color: contrastColor,
      },
      description: {
        text: 'This is a feature description',
        color: featureDescriptionColor,
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
        color: featureDescriptionColor,
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
        color: featureDescriptionColor,
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
        color: featureDescriptionColor,
      },
      buttonColor: buttonColor,
      imgUrl: 'https://f.hellowork.com/bdmtools/2020/10/clickup-2.jpg',
    },
    {
      title: {
        text: 'Feature 2',
        color: contrastColor,
      },
      description: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        color: featureDescriptionColor,
      },
      buttonColor: buttonColor,
      imgUrl:
        'https://webuild.io/static/10b8e9fda5a50be4a5988249480eb386/6db29/clickup-hero.png',
    },
    {
      title: {
        text: 'Feature 3',
        color: contrastColor,
      },
      description: {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        color: featureDescriptionColor,
      },
      buttonColor: buttonColor,
      imgUrl:
        'https://assets.bwbx.io/images/users/iqjWHBFdfxIU/i7WEdPOtQcSA/v0/1200x900.jpg',
    },
  ];

  const styles: SxPropsObject = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: backgroundColor,
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    },
    miniFeaturesContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '6rem',
      width: '75%',
    },
    featuresContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '4rem',
      width: '75%',
    },
    singleFeatureContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',

      alignItems: 'center',
      marginBottom: '8rem',
      height: '60vh',
      width: '100%',
    },
  };
  return (
    <Container maxWidth={false} sx={styles.wrapper}>
      <Box
        sx={{
          width: '75%',
          marginTop: '6rem',
        }}
      >
        <Sponsors />
      </Box>

      <Box container sx={styles.miniFeaturesContainer}>
        {miniFeatures.map((miniFeature, index) => (
          <MiniFeatureCard
            title={miniFeature.title}
            description={miniFeature.description}
            titleVariant={miniFeature.titleVariant}
            descriptionVariant={miniFeature.descriptionVariant}
            icon={miniFeature.icon}
          ></MiniFeatureCard>
        ))}
      </Box>

      <Box container sx={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Box item key={index} sx={styles.singleFeatureContainer}>
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
          </Box>
        ))}
      </Box>
    </Container>
  );
}
