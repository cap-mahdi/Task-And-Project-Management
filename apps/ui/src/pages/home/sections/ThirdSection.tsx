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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      color: '#979797',
    },
  };

  const testimonial = {
    description: {
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      color: '#979797',
    },

    personName: 'John Doe',
    job: 'CEO',
  };

  const testimonials = [testimonial, testimonial, testimonial];

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
