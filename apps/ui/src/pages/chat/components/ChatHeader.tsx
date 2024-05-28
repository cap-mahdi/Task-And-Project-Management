import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputBase,
  List,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useParams } from 'react-router-dom';
import { useCustomMutation } from '../../../hooks/useCustomMutation';
import { CREATE_CHAT } from '../../../services/chat/chatMutation';
import { GET_PROJECT_MEMBERS } from '../../../services/chat/chatQueries';
import { useCustomLazyQuery } from '../../../hooks/useCustomLazyQuery';
import { User } from '../../../__generated__/graphql';

export const ChatHeader: FC = () => {
  const [open, setOpen] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const { projectId } = useParams();
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [createRoom, { loading }] = useCustomMutation(CREATE_CHAT, false);
  const [getUserPorjects, { data: userData }] = useCustomLazyQuery(
    GET_PROJECT_MEMBERS,
    false
  );
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const membersIds = selectedUsers.map((user) => user.id);

    createRoom({
      variables: {
        members: membersIds,
        projectId,
        name: RoomName,
      },
    });
    setOpen(false);
  }

  useEffect(() => {
    getUserPorjects({
      variables: {
        projectId,
      },
    });
  }, []);

  useEffect(() => {
    setUserList(userData?.project?.userProjects.map((user) => user.user));
  }, [userData]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 2,
        marginTop: 2,
      }}
    >
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: 'medium',
        }}
      >
        Chats
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          borderRadius: 3,
        }}
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Group
      </Button>
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
        component={'form'}
        onSubmit={handleFormSubmit}
      >
        <DialogTitle>Add Room</DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              // padding: 2,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <InputBase
              value={RoomName}
              sx={{
                flex: 1,
                ml: 1,
              }}
              placeholder="Give the room a name"
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // gap: 2,
                height: 200,
              }}
            >
              <Typography variant="h6">Add Members</Typography>
              {userList?.map((user) => (
                <Box
                  key={user.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox
                    checked={selectedUsers.includes(user)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers([...selectedUsers, user]);
                      } else {
                        setSelectedUsers(
                          selectedUsers.filter(
                            (selectedUser) => selectedUser !== user
                          )
                        );
                      }
                    }}
                  />
                  <ListItemText primary={user.name} />
                </Box>
              ))}
            </Box>
          </Paper>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>

            {!loading && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  borderRadius: 3,
                }}
                type="submit"
                onClick={handleFormSubmit}
                disabled={loading}
              >
                Add
              </Button>
            )}
            {loading && <CircularProgress disableShrink />}
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};
