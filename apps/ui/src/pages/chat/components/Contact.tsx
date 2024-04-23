import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { FC } from 'react';

export const Contact: FC = () => {
  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: 4,
        ':hover': {
          backgroundColor: '#f0f0f0',
          cursor: 'pointer',
        },
      }}
    >
      <ListItemAvatar>
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </ListItemAvatar>
      <ListItemText
        primary="Miron Vitold"
        secondary={
          <>
            {/* <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              Ali Connors
            </Typography> */}
            {' send a photo'}
          </>
        }
      />
    </ListItem>
  );
};
