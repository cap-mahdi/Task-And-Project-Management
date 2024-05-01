import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardHeader,
  Container,
  Divider,
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
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          // bgcolor: 'red',
        }}
        disableGutters
      >
        <Card
          sx={{
            // flexGrow: 1,
            maxWidth: 345,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '6dvh',
            boxShadow: 'none',
          }}
        >
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
            // bgcolor: 'yellow',
            height: '5dvh',
          }}
        >
          <IconButton size="large">
            <LocalPhoneOutlinedIcon />
          </IconButton>
          <IconButton size="large">
            <CameraAltOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider />
    </>
  );
};
