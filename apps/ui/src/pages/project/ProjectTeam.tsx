import React, { useEffect } from 'react';
import { AddUserToProject } from '../../components';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { GET_PROJECT_USERS } from '../../services/project/projectQueries';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Card, Typography } from '@mui/material';
import useAppContext from '../../context/useAppContext';

export function ProjectTeam(props) {
  const { projectId } = useParams();
  const [globalState] = useAppContext();
  const [loadTeam, { data }] = useCustomLazyQuery(GET_PROJECT_USERS, false);
  //   console.log('teamItems', teamItems);

  useEffect(() => {
    loadTeam({
      variables: {
        projectId,
      },
    });
  }, [globalState.events.ADD_USER_TO_PROJECT]);
  return (
    <Box
      sx={{
        mx: '1rem',
      }}
    >
      <AddUserToProject />

      {data?.getProjectUsers
        ? data?.getProjectUsers.map((projectUser) => {
            console.log('projectUser', projectUser);

            return (
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '1rem',
                  alignItems: 'center',
                  px: '1rem',
                  my: '0.2rem',
                  height: '3rem',
                  boxShadow: '0px 8px 16px 0px rgb(0 0 0 / 25%)',
                  justifyContent: 'flex-start',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '1rem',
                    alignItems: 'center',
                    flexGrow: 1,
                  }}
                >
                  <Avatar />
                  <Typography>{projectUser.user.name}</Typography>
                </Box>
                <Typography sx={{}}>{projectUser.user.email}</Typography>
              </Card>
            );
          })
        : 'No team members'}
    </Box>
  );
}
