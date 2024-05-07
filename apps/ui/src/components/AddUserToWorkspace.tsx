import { FC, useEffect, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from '@mui/material';

const persons = [
  {
    id: 1,
    name: 'Mahdi Chaabane',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 2,
    name: 'Mouhamed Amine Gdoura',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 3,
    name: 'Mehdi Fkih',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 4,
    name: 'Houssem Sahnoun',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 6,
    name: 'Mouhamed Mehdi Khlil',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 7,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 8,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 9,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 10,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 11,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 12,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 13,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 14,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 15,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
  {
    id: 16,
    name: 'Mehdi',
    avatar:
      'https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9',
  },
];

export const AddUserToWorkspace: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton size="large" onClick={() => setOpen(true)}>
        <PersonAddAltIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: 600,
          },
        }}
      >
        <DialogTitle>Add user to workspace</DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              // padding: 2,
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <InputBase
              sx={{
                flex: 1,
                ml: 1,
              }}
              placeholder="Search user"
            />
            <IconButton
              type="button"
              sx={{
                p: '10px',
              }}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <List>
            {persons.map((person) => (
              <ListItem
                key={person.id}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={() => {
                      console.log('click');
                    }}
                    // checked={false}
                  />
                }
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src={person.avatar} />
                </ListItemAvatar>
                <ListItemText primary={person.name} />
              </ListItem>
            ))}
            {/* <ListItem
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => {
                    console.log('click');
                  }}
                  // checked={false}
                />
              }
            >
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
                />
              </ListItemAvatar>
              <ListItemText primary="Mehdi" />
            </ListItem> */}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};
