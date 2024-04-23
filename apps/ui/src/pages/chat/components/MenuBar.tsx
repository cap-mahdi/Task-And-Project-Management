import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  IconButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { FC } from 'react';

export const MenuBar: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          borderBottom: (theme) => `1px solid ${theme.palette.gray.main}`,
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'white',
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Card sx={{ flexGrow: 1, maxWidth: 345, boxShadow: 'none' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'grey' }} aria-label="">
                    R
                  </Avatar>
                }
                title="Mehdi"
                subheader="Online"
              />
            </Card>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 'auto',
              }}
            >
              <IconButton size="large">
                <LocalPhoneOutlinedIcon />
              </IconButton>
              <IconButton size="large">
                <CameraAltOutlinedIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
