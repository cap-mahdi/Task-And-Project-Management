import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_TASKS } from '../../services/task/taskQuery';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Tasks } from './Tasks';
import { taksMapper } from './taskMapper';

export const UserTasks = () => {
  const [getTasks, { loading }] = useLazyQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);
  console.log(' HERERERERER', taksMapper(tasks));
  useEffect(() => {
    getTasks().then((res) => {
      console.log('res', res);
      setTasks(res.data.tasks);
    });
  }, []);

  if (loading) return <CircularProgress />;
  else return <Tasks intialData={taksMapper(tasks)} />;
};
