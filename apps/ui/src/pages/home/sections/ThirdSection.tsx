import { useTheme } from '@emotion/react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Quote } from '../components';

export function ThirdSection() {
  const customTheme = useTheme();
  const backgroundColor = '#ECF2F7';
  const contrastColor = customTheme.palette.blackPearl.main;

  const header = {
    title: {
      text: 'Testimonials',
      color: contrastColor,
    },
    description: {
      text: "TeamFlow helps team effectively manage their tasks, here's what our clients are saying about us.",
      color: '#979797',
    },
  };

  const testimonial1 = {
    description: {
      text: 'TeamFlow has helped my team with the many projects we are given.',
      color: '#979797',
    },

    personName: 'Mehdi',
    job: 'Fellow Student',
  };

  const testimonial2 = {
    description: {
      text: 'With the user friendly interface, TeamFlow has proven a lot easier to use than other task management websites.',
      color: '#979797',
    },

    personName: 'Houssem',
    job: 'Aspiring Programmer',
  };

  const testimonial3 = {
    description: {
      text: 'A very well made management app. It keeps me organized and on track every day',
      color: '#979797',
    },

    personName: 'Amine',
    job: 'Software Engineer',
  };

  const testimonials = [testimonial1, testimonial2, testimonial3];

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        pb: '5rem',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: contrastColor }}
        >
          {header.title.text}
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{ color: '#979797', width: '50%' }}
          align="center"
        >
          {header.description.text}
        </Typography>
      </Container>

      <Box
        sx={{
          paddingTop: '8rem',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '75%',
          flexWrap: 'wrap',
          gap: 2,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <Quote
            text={testimonial.description.text}
            personName={testimonial.personName}
            job={testimonial.job}
            textColor={contrastColor}
            backgroundColor={backgroundColor}
          />
        ))}
      </Box>
    </Container>
  );
}
