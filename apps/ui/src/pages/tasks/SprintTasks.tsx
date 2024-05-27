import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_TASKS } from '../../services/task/taskQuery';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { Tasks } from './Tasks';
import { taksMapper } from './taskMapper';
import { useParams } from 'react-router-dom';
import useAppContext from '../../context/useAppContext';

export const SprintTasks = () => {
  const [globalState, setGlobalState] = useAppContext();

  const [getTasks, { loading }] = useLazyQuery(GET_TASKS);
  const [tasks, setTasks] = useState([]);
  const { sprintId } = useParams();
  useEffect(() => {
    getTasks({
      variables: { milestoneId: sprintId },
    }).then((res) => {
      console.log('res', res);
      setTasks(res.data.tasks);
    });
  }, [globalState.events.CREATE_TASK]);

  return <Tasks intialData={taksMapper(tasks)} />;
};
