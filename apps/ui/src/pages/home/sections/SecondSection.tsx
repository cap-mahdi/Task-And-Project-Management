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
        text: 'Progress Tracking',
        color: contrastColor,
      },
      description: {
        text: 'Track your progress with visual indicators',
        color: featureDescriptionColor,
      },
      titleVariant: 'h6' as TypographyProps['variant'],
      descriptionVariant: 'subtitle2' as TypographyProps['variant'],
      icon: <ViewComfyIcon fontSize="large" style={{ color: buttonColor }} />,
    },

    {
      title: {
        text: 'Security and Privacy',
        color: contrastColor,
      },
      description: {
        text: 'Ensure your data is safe and secure',
        color: featureDescriptionColor,
      },
      titleVariant: 'h6' as TypographyProps['variant'],
      descriptionVariant: 'subtitle2' as TypographyProps['variant'],
      icon: <AutoGraphIcon fontSize="large" style={{ color: buttonColor }} />,
    },

    {
      title: {
        text: 'Due dates and reminders',
        color: contrastColor,
      },
      description: {
        text: 'Set due dates and reminders to ensure you never miss a deadline',
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
        text: 'Task Creation and Management',
        color: contrastColor,
      },
      description: {
        text: 'Create, edit and delete tasks with just a few clicks. Organize your tasks into lists for better project management',
        color: featureDescriptionColor,
      },
      buttonColor: buttonColor,
      imgUrl: 'https://f.hellowork.com/bdmtools/2020/10/clickup-2.jpg',
    },
    {
      title: {
        text: 'Collaborative Workspace',
        color: contrastColor,
      },
      description: {
        text: 'Invite team members to your projects, assign tasks, and track progress effectively. Improve team communication and efficiency.',
        color: featureDescriptionColor,
      },
      buttonColor: buttonColor,
      imgUrl:
        'https://webuild.io/static/10b8e9fda5a50be4a5988249480eb386/6db29/clickup-hero.png',
    },
    {
      title: {
        text: 'Notifications',
        color: contrastColor,
      },
      description: {
        text: 'Receive real-time notifications for task updates, deadlines, and team comments to stay informed and up-to-date.',
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
