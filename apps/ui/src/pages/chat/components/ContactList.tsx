import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { FC } from 'react';

export const ContactList: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: '525px',
        overflowY: 'auto',
      }}
    >
      {[...Array(10)].map((_, index) => (
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
            <Avatar
              alt="Remy Sharp"
              src="https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
            />
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
      ))}
    </Box>
  );
};
