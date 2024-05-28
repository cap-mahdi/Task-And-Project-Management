import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material';
import React, { FC, useContext, useEffect } from 'react';
import { SxPropsObject } from '../../../utils/sxPropsObject';
import { SocketContext } from '../../../context/useSocketContext';
import useProjectContext from '../../../context/useProjectContext';
import useAppContext from '../../../context/useAppContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateToAgo } from '../../../utils/dateToAgoHelper';

export const MessageList: FC = () => {
  const styles: SxPropsObject = {
    cnvBox: {
      fontSize: '3px',
      maxWidth: '40%',
      border: '1px solid #f0f0f0',
      borderRadius: 4,
      padding: 2,
      marginRight: 'auto',
      boxShadow: '14px 18px 21px -10px rgba(0,0,0,0.25)',
      WebkitBoxShadow: '14px 18px 21px -10px rgba(0,0,0,0.25)',
      wordBreak: 'break-word',
      whiteSpace: 'normal',
    },
  };
  const socket = useContext(SocketContext);
  const [projectState, setProjectState] = useProjectContext();
  const [globalState] = useAppContext();

  function handleDelete(id) {
    socket.emit('deletemessage', id);
  }

  useEffect(() => {
    const e = socket.on('receivemessage', (data: any) => {
      setProjectState((prevState) => {
        return {
          ...prevState,
          messages: [
            ...prevState.messages,
            {
              id: data.id,
              content: data.content,
              sender: data.sender,
              createdAt: data.createdAt,
            },
          ],
        };
      });
    });
    const e2 = socket.on('deletemessage', (id) => {
      setProjectState((prevState) => {
        return {
          ...prevState,
          messages: prevState.messages.map((message) => {
            return message.id !== id
              ? message
              : { ...message, deletedAt: new Date() };
          }),
        };
      });
    });
    return () => {
      socket.off('receivemessage');
      socket.off('deletemessage');
    };
  }, []);

  return (
    <List sx={{ overflowY: 'auto' }}>
      {globalState.user && projectState?.messages
        ? projectState?.messages.map((message, index) => {
            return (
              <React.Fragment key={message.id}>
                {/* <Typography>{globalState.user.id}</Typography> */}
                <ListItem
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    ':hover': {
                      backgroundColor: 'transparent',
                      cursor: 'default',
                    },
                  }}
                >
                  {message.sender.id !== globalState.user.id && (
                    <>
                      <ListItemAvatar>
                        <Avatar
                          alt="Profile Picture"
                          src={message.sender.avatar}
                        />
                      </ListItemAvatar>
                      <Tooltip
                        title={dateToAgo(message.createdAt)}
                        placement="right"
                      >
                        <ListItemText
                          sx={{
                            ...styles.cnvBox,

                            backgroundColor: message.deletedAt
                              ? 'red'
                              : 'white',
                          }}
                          primary={message.sender.name}
                          secondary={
                            message.deletedAt
                              ? 'Message Deleted'
                              : message.content
                          }
                        ></ListItemText>
                      </Tooltip>
                    </>
                  )}

                  {message.sender.id === globalState.user.id && (
                    <>
                      <ListItemAvatar>
                        {message.deletedAt ? (
                          ''
                        ) : (
                          <Button onClick={() => handleDelete(message.id)}>
                            <DeleteIcon />
                          </Button>
                        )}
                      </ListItemAvatar>
                      <Tooltip
                        title={dateToAgo(message.createdAt)}
                        placement="left"
                      >
                        <ListItemText
                          secondary={
                            message.deletedAt
                              ? 'Message Deleted'
                              : message.content
                          }
                          sx={{
                            ...styles.cnvBox,
                            color: 'white',
                            maxWidth: '40%',
                            border: '1px solid #f0f0f0',
                            borderRadius: 4,
                            padding: 2,
                            marginRight: 2,
                            marginLeft: 'auto',
                            backgroundColor: (theme) =>
                              message.deletedAt
                                ? theme.palette.error.main
                                : theme.palette.primary.main,
                            boxShadow: '14px 18px 21px -10px rgba(0,0,0,0.25)',
                          }}
                        ></ListItemText>
                      </Tooltip>
                      <ListItemAvatar>
                        <Avatar
                          alt="Profile Picture"
                          src={message.sender.avatar}
                        />
                      </ListItemAvatar>
                    </>
                  )}
                </ListItem>
              </React.Fragment>
            );
          })
        : ''}
    </List>
  );
};
