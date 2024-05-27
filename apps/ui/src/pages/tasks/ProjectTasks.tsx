import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_TASKS } from '../../services/task/taskQuery';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Tasks } from './Tasks';
import { taksMapper } from './taskMapper';
import { useParams } from 'react-router-dom';

export const ProjectTasks = () => {
  const [getTasks, { loading }] = useLazyQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams();
  useEffect(() => {
    getTasks({
      variables: { projectId },
    }).then((res) => {
      console.log('res', res);
      setTasks(res.data.tasks);
    });
  }, []);

  if (loading) return <CircularProgress />;
  else return <Tasks intialData={taksMapper(tasks)} />;
};
