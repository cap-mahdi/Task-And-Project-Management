import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  SxProps,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const titles = [
  {
    title: 'Company',
    links: [
      {
        title: 'About us',
        link: '#',
      },
      {
        title: 'Careers',
        link: '#',
      },
      {
        title: 'Press',
        link: '#',
      },
    ],
  },
  {
    title: 'Product',
    links: [
      {
        title: 'Features',
        link: '#',
      },
      {
        title: 'Testimonials',
        link: '#',
      },
      {
        title: 'Highlights',
        link: '#',
      },
      {
        title: 'Pricing',
        link: '#',
      },
      {
        title: 'FAQs',
        link: '#',
      },
    ],
  },
  {
    title: 'Services',
    links: [
      {
        title: 'Digital Marketing',
        link: '#',
      },
      {
        title: 'Content Writing',
        link: '#',
      },
      {
        title: 'Seo for Business',
        link: '#',
      },
      {
        title: 'UI Design',
        link: '#',
      },
    ],
  },
  {
    title: 'Legal',
    links: [
      {
        title: 'Privacy Policy',
        link: '#',
      },
      {
        title: 'Terms & Conditions',
        link: '#',
      },
      {
        title: 'Return Policy',
        link: '#',
      },
    ],
  },
  // {
  //   title: 'Contact Us',
  //   links: [
  //     {
  //       title: 'Privacy Policy',
  //       link: '#',
  //     },
  //     {
  //       title: 'Terms & Conditions',
  //       link: '#',
  //     },
  //     {
  //       title: 'Return Policy',
  //       link: '#',
  //     },
  //   ],
  // },
  {
    title: 'Contact Us',
    links: [
      {
        title: 'support@teamflow.ip',
        link: '#',
      },
      {
        title: '+133-394-3439-1435',
        link: '#',
      },
    ],
  },
];

export const Footer: FC = () => {
  const styles: SxProps = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: (theme) => theme.palette.blackPearl.main,
      width: '100%',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      py: 8,
      width: '75%',
      textAlign: 'left',
    },
  };
  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.container}>
        <Box
          sx={{
            display: 'flex',
            // flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            // bgcolor: 'black',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            py: 10,
          }}
        >
          {titles.map((title) => (
            <Box
              key={title.title}
              sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                // justifyContent: 'space-between',
                alignItems: 'flex-start',
                textAlign: 'left',

                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                sx={{
                  color: 'rgb(151, 151, 151)',
                  fontSize: '1rem',
                  pb: 3,
                }}
              >
                {title.title}
              </Typography>
              {title.links.map((link) => (
                <Typography
                  component={Link}
                  style={{
                    color: 'white',
                    textDecoration: 'none',
                    padding: 0,
                  }}
                  to={link.link}
                >
                  {link.title}
                </Typography>
              ))}
            </Box>
          ))}
        </Box>
        <Divider
          sx={{ width: '100%', backgroundColor: 'rgb(151, 151, 151)' }}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid',
            py: 2,
          }}
        >
          <Typography
            sx={{
              py: 2,
              color: 'white',
              fontSize: 12,
              justifyContent: 'right',
            }}
          >
            © 2024 Copyright, All Right Reserved, Made by TeamFlow with
            <span
              style={{
                color: 'blue',
                fontSize: 12,
              }}
            >
              {' '}
              ❤{' '}
            </span>
          </Typography>
          <Stack direction="row" justifyContent="left" spacing={1} useFlexGap>
            <IconButton
              href="https://github.com/mui"
              aria-label="Twitter"
              sx={{ color: 'white' }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://github.com/mui"
              aria-label="GitHub"
              sx={{ alignSelf: 'center', color: 'white' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://github.com/mui"
              aria-label="instagram"
              sx={{ alignSelf: 'center', color: 'white' }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://github.com/mui"
              aria-label="linkedin"
              sx={{ alignSelf: 'center', color: 'white' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
