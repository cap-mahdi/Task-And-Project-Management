import React, { useEffect } from 'react';
import { AddUserToProject } from '../../components';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { GET_PROJECT_USERS } from '../../services/project/projectQueries';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Card, Typography } from '@mui/material';
import { GET_WORKSPACE_USERS } from '../../services/workspace/workspaceQueries';
import { AddUserToWorkspace } from '../../components/AddUserToWorkspace';
import useAppContext from '../../context/useAppContext';

export function WorkspaceTeam(props) {
  const { workspaceId } = useParams();
  const [globalState] = useAppContext();
  const [loadTeam, { data }] = useCustomLazyQuery(GET_WORKSPACE_USERS, false);
  //   console.log('teamItems', teamItems);

  useEffect(() => {
    loadTeam({
      variables: {
        workspaceId,
      },
    });
  }, [globalState.events.ADD_USER_TO_WORKSPACE]);
  return (
    <Box
      sx={{
        mx: '1rem',
      }}
    >
      <AddUserToWorkspace />

      {data?.getWorkspaceUsers
        ? data?.getWorkspaceUsers.map((workspaceUser) => {
            console.log('workspaceUser', workspaceUser);

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
                  <Typography>{workspaceUser.user.name}</Typography>
                </Box>
                <Typography sx={{}}>{workspaceUser.user.email}</Typography>
              </Card>
            );
          })
        : 'No team members'}
    </Box>
  );
}
