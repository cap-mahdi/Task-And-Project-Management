import { Avatar, IconButton, InputBase, Paper } from '@mui/material';
import { FC, useContext, useState } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import useProjectContext from '../../../context/useProjectContext';
import { SocketContext } from '../../../context/useSocketContext';
import useAppContext from '../../../context/useAppContext';

export const InputChat: FC = () => {
  const [projectState, setProjectState] = useProjectContext();
  const [message, setMessage] = useState('');
  const socket = useContext(SocketContext);
  const [globalState] = useAppContext();

  function sendMessage(e: any) {
    e.preventDefault();
    if (!message) return;

    socket.emit('sendmessage', {
      message,
      roomId: projectState.currentChat.id,
      userId: globalState.user.id,
    });
    setMessage('');
  }

  return (
    <Paper
      sx={{
        width: '100%',
        display: 'flex',
        height: '100px',
        flexDirection: 'row',
        gap: 1,
        // justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 10px',
        boxShadow: 'none',
      }}
      component={'form'}
      onSubmit={sendMessage}
    >
      <IconButton>
        <Avatar alt="Remy Sharp" src={globalState.user.avatar}>
          {globalState.user.name[0].toUpperCase()}{' '}
        </Avatar>
      </IconButton>
      <InputBase
        sx={{
          width: '90%',
          height: '70%',
          padding: '0 10px',
          border: '1px solid #f0f0f0',
          borderRadius: 2,
        }}
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <IconButton type="submit">
        <SendOutlinedIcon />
      </IconButton>
      <IconButton>
        <AttachFileOutlinedIcon />
      </IconButton>
    </Paper>
  );
};
