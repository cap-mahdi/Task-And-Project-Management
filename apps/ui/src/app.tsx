// eslint-disable-next-line @typescript-eslint/no-unused-vars

import FeatureCard from './components/featureCard';
import InvertedFeatureCard from './components/invertedFeatureCard';
import MiniFeatureCard from './components/miniFeatureCard';
import Quote from './components/quote';
import Sponsors from './components/sponsors';

import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { TypographyProps } from '@mui/material/Typography';

import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import PersonIcon from '@mui/icons-material/Person';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

export function App() {
  return (
    <>
      <RenderFirstPage />
      <RenderSecondPage />
      <RenderThirdPage />
    </>
  );
}

function RenderFirstPage() {
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
        width: '100vw',
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

function RenderSecondPage() {
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
        width: '100vw',
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

function RenderThirdPage() {
  const customTheme = useTheme();

  const backgroundColor = '#ECF2F7';
  const contrastColor = customTheme.palette.blackPearl.main;

  const testimonial = {
    title: {
      text: 'Testimonials',
      color: contrastColor,
    },
    description: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      color: '#979797',
    },
  };

  return (
    <Container
      maxWidth={false}
      style={{
        display: 'block',
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        width: '100vw',
        textAlign: 'center',
      }}
    >
      <Container style={{ paddingTop: '5rem' }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          style={{ color: contrastColor }}
        >
          {testimonial.title.text}
        </Typography>

        <Typography
          variant="subtitle1"
          style={{ color: '#979797' }}
          align="center"
        >
          {testimonial.description.text}
        </Typography>
      </Container>

      <Grid
        container
        spacing={12}
        justifyContent={'center'}
        alignItems={'center'}
        style={{ paddingTop: '8rem' }}
      >
        <Grid item>
          <Quote
            text={testimonial.description.text}
            personName="John Doe"
            job="CEO"
            textColor={contrastColor}
            backgroundColor={backgroundColor}
          />
        </Grid>

        <Grid item>
          <Quote
            text={testimonial.description.text}
            personName="John Doe"
            job="CEO"
            textColor={contrastColor}
            backgroundColor={backgroundColor}
          />
        </Grid>

        <Grid item>
          <Quote
            text={testimonial.description.text}
            personName="John Doe"
            job="CEO"
            textColor={contrastColor}
            backgroundColor={backgroundColor}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
