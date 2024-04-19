import { useTheme } from '@emotion/react';
import { Container, Grid, Typography } from '@mui/material';
import { Quote } from '../components';

export function ThirdSection() {
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
