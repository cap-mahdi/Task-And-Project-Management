import { Avatar, IconButton, InputBase, Paper } from '@mui/material';
import { FC } from 'react';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

export const InputChat: FC = () => {
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
    >
      <IconButton>
        <Avatar
          alt="Remy Sharp"
          src="https://api.dicebear.com/8.x/micah/svg?backgroundColor=b6e3f4,c0aede,d1d4f9"
        />
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
