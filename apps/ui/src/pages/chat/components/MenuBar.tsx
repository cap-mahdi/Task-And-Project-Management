import { Avatar, Box, Card, CardHeader, IconButton } from '@mui/material';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { FC } from 'react';

export const MenuBar: FC = () => {
  return (
    <Box
      sx={{
        marginTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}
    >
      <Card
        sx={{
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
            <Avatar
              alt="Remy Sharp"
              src="https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
            />
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
  );
};
