import { Avatar, Box, Card, CardHeader, IconButton } from '@mui/material';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { FC } from 'react';
import useProjectContext from '../../../context/useProjectContext';

export const MenuBar: FC = () => {
  const [projectState, setProjectState] = useProjectContext();

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
      {projectState.currentChat && (
        <>
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
                <Avatar alt={projectState.currentChat.name}>
                  {projectState?.currentChat?.name[0]}
                </Avatar>
              }
              title={projectState.currentChat.name}
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
        </>
      )}
    </Box>
  );
};
