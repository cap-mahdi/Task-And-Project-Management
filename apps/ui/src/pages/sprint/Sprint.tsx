import React, { useEffect } from 'react';
import { MainLayout } from '../../layout/MainLayout';
import { Outlet, useParams } from 'react-router-dom';
import useSprintContext from '../../context/useSprintContext';
import { GET_MILESTONE_BY_ID } from '../../services/milestone/milestoneQueries';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';

export function Sprint() {
  const { sprintId } = useParams();
  const [sprintState, setSprintState] = useSprintContext();

  const [loadSprint, sprintItem] = useCustomLazyQuery(
    GET_MILESTONE_BY_ID,
    false
  );
  useEffect(() => {
    if (sprintItem?.data) {
      setSprintState({ data: sprintItem?.data?.milestone });
    }
  }, [sprintItem.data]);
  useEffect(() => {
    if (sprintId)
      loadSprint({
        variables: {
          id: sprintId,
        },
      });
  }, [sprintId, loadSprint]);

  return (
    <MainLayout
      sectionsData={{
        sectionTitle: `${
          sprintState.data?.name ? sprintState.data?.name : 'Sprint'
        }`,
        sections: [
          {
            title: 'Overview',
            link: '',
            enableLink: true,
            onSelected: () => {},
          },
          {
            title: 'Tasks',
            link: 'task',
            enableLink: true,
            onSelected: () => {},
          },

          {
            title: 'Settings',
            link: 'settings',
            enableLink: true,
            onSelected: () => {},
          },
        ],
      }}
    >
      <Outlet />
    </MainLayout>
  );
}
