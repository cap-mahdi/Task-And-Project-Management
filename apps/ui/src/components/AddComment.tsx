import {
  Avatar,
  Box,
  Button,
  Card,
  Input,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';
import { theme } from '../theme';
import { StyledButton } from './StyledButton';
import { useCustomMutation } from '../hooks/useCustomMutation';
import { CREATE_COMMENT } from '../services/comment/commentMutation';

export function AddComment({ taskID }) {
  const [createComment] = useCustomMutation(CREATE_COMMENT, true);
  const [comment, setComment] = React.useState('');

  const handleAddComment = async () => {
    console.log('HOSSSSS ', comment);
    createComment({
      variables: {
        content: comment,
        taskID: taskID,
      },
    })
      .then((res) => {
        console.log('created comment', res);
      })
      .catch((err) => {
        console.error('error creating comment', err);
      });

    setComment('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: (theme) => theme.palette.acapulco.main,
            width: '2.5rem',
            height: '2.5rem',
            fontSize: '140%',
          }}
        >
          N
        </Avatar>
        <TextField
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          sx={{
            '.MuiInputBase-input': {
              fontSize: '80%', // Adjust the font size for the placeholder text
            },
            '& .MuiOutlinedInput-root': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'transparent', // Remove outline on hover
              },
            },
            border: '1px solid',
            borderColor: (theme) => theme.palette.lightGray.main,
            borderRadius: '0.3rem',
            width: '100%',
          }}
          placeholder="Add your reply"
          variant="outlined"
          multiline
          fullWidth
          rows={3}
        />
      </Box>
      <StyledButton
        sx={{
          mt: 1,
        }}
        onClick={handleAddComment}
      >
        Send
      </StyledButton>
    </Box>
  );
}
