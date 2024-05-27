import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_TASKS } from '../../services/task/taskQuery';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Tasks } from './Tasks';
import { taksMapper } from './taskMapper';
import { useParams } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';

export const ProjectTasks = () => {
  const [globalState, setGlobalState] = useAppContext();

  const [getTasks, { loading }] = useCustomLazyQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams();
  useEffect(() => {
    getTasks({
      variables: { projectId },
    }).then((res) => {
      console.log('res', res);
      setTasks(res.data.tasks);
    });
  }, [globalState.events.CREATE_TASK]);

  return <Tasks intialData={taksMapper(tasks)} />;
};
