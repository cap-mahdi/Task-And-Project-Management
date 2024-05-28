import {
  Avatar,
  Box,
  InputAdornment,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import { FC, useContext, useEffect, useState } from 'react';
import { GET_CHAT, GET_MESSAGES } from '../../../services/chat/chatQueries';
import { useCustomLazyQuery } from '../../../hooks/useCustomLazyQuery';
import { useParams } from 'react-router-dom';
import { SocketContext } from '../../../context/useSocketContext';
import useProjectContext from '../../../context/useProjectContext';
import SearchIcon from '@mui/icons-material/Search';

export const ContactList: FC = () => {
  const params = useParams();
  const [loadChat, chatItems] = useCustomLazyQuery(GET_CHAT, true);
  const [users, setUsers] = useState([]);
  const socket = useContext(SocketContext);
  const [projectState, setProjectState] = useProjectContext();
  const [getmessages, { data }] = useCustomLazyQuery(GET_MESSAGES, true);
  const [search, setSearch] = useState('');

  function handleSearch(event: any) {
    setSearch(event.target.value);
  }

  useEffect(() => {
    if (search) {
      const filteredUsers = users.filter((user: any) =>
        user.name.toLowerCase().includes(search.toLowerCase())
      );
      setUsers(filteredUsers);
    } else if (chatItems?.data?.getUserRoomsByUserIdAndProjectId) {
      setUsers(chatItems.data.getUserRoomsByUserIdAndProjectId);
    }
  }, [search]);

  function ChangeCurrentChat(chat: any) {
    if (projectState?.currentChat?.id === chat.id) return;
    if (
      projectState?.currentChat?.id &&
      projectState?.currentChat?.id !== chat.id
    ) {
      socket.emit('leaveroom', projectState.currentChat.id);
    }
    setProjectState((prevState) => ({ ...prevState, currentChat: chat }));
    // setCurrentChat(chatId);
    socket.emit('joinroom', chat.id);

    getmessages({
      variables: {
        id: chat.id,
      },
    });
  }

  useEffect(() => {
    if (chatItems?.data?.getUserRoomsByUserIdAndProjectId) {
      setUsers(chatItems.data.getUserRoomsByUserIdAndProjectId);
    }
  }, [chatItems]);

  useEffect(() => {
    loadChat({
      variables: {
        projectId: params?.projectId,
      },
    });
  }, []);

  useEffect(() => {
    if (data) {
      console.log('data', data.room.messages);

      const Message = data.room.messages.map((message: any) => {
        return {
          id: message.id,
          content: message.content,
          createdAt: message.createdAt,
          sender: message.sender,
        };
      });
      setProjectState((prevState) => {
        return {
          ...prevState,
          messages: Message,
        };
      });
    }
  }, [data]);

  return (
    <>
      <TextField
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        placeholder="Search Contact"
        sx={{
          margin: '0 auto',
          width: '90%',
        }}
        value={search}
        onChange={handleSearch}
      ></TextField>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          height: '525px',
          overflowY: 'auto',
        }}
      >
        {users.map((chat: any) => {
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
              onClick={() => ChangeCurrentChat(chat)}
            >
              <ListItemAvatar>
                <Avatar>{chat.name[0]}</Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={chat.name}
                // secondary={<>{' send a photo'}</>}
              />
            </ListItem>
          );
        })}
      </Box>
    </>
  );
};
