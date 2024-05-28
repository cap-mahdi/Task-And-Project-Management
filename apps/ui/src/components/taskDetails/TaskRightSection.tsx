import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Comment } from '../Comment';
import { AddComment } from '../AddComment';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { GET_COMMENTS } from '../../services/comment/commentQueries';
import { set } from 'react-hook-form';
import { useCustomMutation } from '../../hooks/useCustomMutation';
import { CREATE_COMMENT } from '../../services/comment/commentMutation';
import useAppContext from '../../context/useAppContext';

interface TaskRightSectionProps {
  taskId: string;
}

export function TaskRightSection({ taskId }: TaskRightSectionProps) {
  const [globalState] = useAppContext();
  console.log('globalState', globalState);
  const [comments, setComments] = React.useState([]);
  const [getComments, { data, loading, error }] = useCustomLazyQuery(
    GET_COMMENTS,
    true
  );

  useEffect(() => {
    console.log('task id: ', taskId);
    console.log('globalState TOKEN', globalState.token);

    // getComments({
    //   variables: {
    //     taskID: taskId,
    //   },
    // }).then((data) => {
    //   console.log('resultt: ', data);
    //   const newData = { ...data.comments, name: data.user.name };
    //   setComments(newData);
    // });

    getComments({ variables: { taskID: taskId } }).then((result) => {
      const fetchedComments = result.data.comments.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        user: comment.user.name,
      }));
      setComments(fetchedComments);
    });

    console.log(
      'link sse',
      `http://localhost:3000/api/task/${taskId}/sse?token=${globalState.token}`
    );
    const eventSource = new EventSource(
      `http://localhost:3000/api/task/${taskId}/sse?token=${globalState.token}`
    );
    eventSource.onopen = () => {
      console.log('EventSource connected');
    };

    eventSource.addEventListener('create-comment', (event) => {
      const data = JSON.parse(event.data);
      console.log('create-comment', data);
      const newComment = {
        id: data.id,
        content: data.content,
        user: data.user.name,
      };
      setComments((prev) => {
        const updatedComments = [...prev, newComment];
        console.log('created comments', updatedComments);
        return updatedComments;
      });
    });

    eventSource.addEventListener('delete-comment', (event) => {
      const data = JSON.parse(event.data);
      console.log('delete-comment', data);

      setComments((prev) => {
        const updatedComments = prev.filter(
          (comment) => comment.id !== data.id
        );
        console.log('deleted comments', updatedComments);
        return updatedComments;
      });
    });

    eventSource.addEventListener('edit-comment', (event) => {
      const data = JSON.parse(event.data);
      console.log('edit-comment', data);

      setComments((prev) => {
        const updatedComments = prev.map((comment) =>
          comment.id === data.id
            ? { ...comment, content: data.content }
            : comment
        );
        console.log('edited comments', updatedComments);
        return updatedComments;
      });
    });

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
    };
    return () => {
      eventSource.close();
    };
  }, []);

  // useEffect(() => {
  //   if (data && data.user && data.comments) {
  //     // data.userId = data.user.id;
  //     console.log('data now: ', data);
  //     const newData = { ...data.comments, name: data.user.name };
  //     setComments(data.comments);
  //   }
  // }, [data]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',

        width: '50%',
        px: 1,
        gap: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',

          gap: 1.5,
          overflow: 'hidden',
          overflowY: 'auto', // Enable vertical scrolling
          //   bgcolor: (theme) => theme.palette.acapulco.main,
        }}
      >
        {/* <Comment src="https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg" />
        <Comment src="https://img.freepik.com/photos-premium/logo-avatar-jeu-dessin-anime-pour-marque-jeux_902820-467.jpg" />
        <Comment />
        <Comment /> */}
        {comments.map(
          (comment) => (
            console.log('comment', comment),
            (<Comment content={comment?.content} name={comment?.user} />)
          )
        )}
      </Box>

      <AddComment taskID={taskId} />
    </Box>
  );
}
