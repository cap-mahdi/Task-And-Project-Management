import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer: FC = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // gap: { xs: 4, sm: 8 },
        py: 8,
        textAlign: { sm: 'center', md: 'left' },
        background: (theme) => theme.palette.blackPearl.main,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          width: '100%',
          gap: 10,
          alignItems: 'flex-start',
          justifyContent: 'center',
          py: 10,
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: 'rgb(151, 151, 151)',
            }}
          >
            Company
          </Typography>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            About us
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Careers
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Press
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: 'rgb(151, 151, 151)',
            }}
          >
            Product
          </Typography>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Features
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Testimonials
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Highlights
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Pricing
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            FAQs
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: 'rgb(151, 151, 151)',
            }}
          >
            Services
          </Typography>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Digital Marketing
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Content Writing
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Seo for Business
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            UI Design
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: 'rgb(151, 151, 151)',
            }}
          >
            Legal
          </Typography>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Privacy Policy
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Terms & Conditions
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            Return Policy
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            fontWeight={600}
            sx={{
              color: 'rgb(151, 151, 151)',
            }}
          >
            Contact Us
          </Typography>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            support@braininwave.io
          </Link>
          <Link
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
            to="#"
          >
            +133-394-3439-1435
          </Link>
        </Box>
      </Box>
      <Divider sx={{ width: '75%', backgroundColor: 'rgb(151, 151, 151)' }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '75%',
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
          © 2024 Copyright, All Right Reserved, Made by Sejal_ui_ux with
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
    </Container>
  );
};
