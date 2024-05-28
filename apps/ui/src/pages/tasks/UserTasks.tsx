import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_TASKS } from '../../services/task/taskQuery';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Tasks } from './Tasks';
import { taksMapper } from './taskMapper';
import useAppContext from '../../context/useAppContext';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';

export const UserTasks = () => {
  const [getTasks, { loading }] = useCustomLazyQuery(GET_TASKS, false);
  const [globalState, setGlobalState] = useAppContext();

  const [tasks, setTasks] = useState([]);
  console.log(' HERERERERER', taksMapper(tasks));
  useEffect(() => {
    console.log('i got the event');
    getTasks().then((res) => {
      console.log('waaaaaaaay jdida AAAAAAAAAAAAAA', res);
      setTasks(res.data.tasks);
    });
  }, [globalState.events.CREATE_TASK]);

  // if (loading) return <CircularProgress />;
  return <Tasks intialData={taksMapper(tasks)} />;
};
