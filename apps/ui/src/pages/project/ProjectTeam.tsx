import React, { useEffect } from 'react';
import { AddUserToProject } from '../../components';
import { useCustomLazyQuery } from '../../hooks/useCustomLazyQuery';
import { GET_PROJECT_USERS } from '../../services/project/projectQueries';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Card, Typography } from '@mui/material';
import useAppContext from '../../context/useAppContext';
import { ProjectRole } from '../../__generated__/graphql';

export function ProjectTeam(props) {
  const { projectId } = useParams();
  const [globalState] = useAppContext();
  const [loadTeam, { data }] = useCustomLazyQuery(GET_PROJECT_USERS, false);

  const ProjectRoleMapper: Record<ProjectRole, string> = {
    [ProjectRole.ProjectAdmin]: 'Admin',
    [ProjectRole.ProjectEditor]: 'Editor',
    [ProjectRole.ProjectMember]: 'Member',
  };

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
                  <Avatar src={projectUser.user.avatar}>
                    {projectUser.user.name[0].toUpperCase()}
                  </Avatar>
                  <Typography>{projectUser.user.name}</Typography>
                </Box>
                <Typography sx={{}}>{projectUser.user.email}</Typography>
                <Typography
                  sx={{
                    pl: '0.5rem',
                  }}
                >
                  {ProjectRoleMapper[projectUser.role]}
                </Typography>
              </Card>
            );
          })
        : 'No team members'}
    </Box>
  );
}
