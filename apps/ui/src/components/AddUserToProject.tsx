import { FC, useEffect, useRef, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ProjectRole, User } from '../__generated__/graphql';
import { useCustomMutation } from '../hooks/useCustomMutation';
import { ADD_USERS_TO_WORKSPACE } from '../services/workspace/workspaceMutations';
import { useParams } from 'react-router-dom';
import { useCustomLazyQuery } from '../hooks/useCustomLazyQuery';
import { GET_ALL_WORKSPACE_MEMBERS_NOT_IN_PROJECT } from '../services/project/projectQueries';
import { ADD_USERS_TO_PROJECT } from '../services/project/projectMutations';
import useEvent from '../hooks/useEvent';

const ProjectRoleMapper: Record<ProjectRole, string> = {
  [ProjectRole.ProjectAdmin]: 'Admin',
  [ProjectRole.ProjectEditor]: 'Editor',
  [ProjectRole.ProjectMember]: 'Member',
};

type IUser = Partial<User>;

export const AddUserToProject: FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<ProjectRole>(
    ProjectRole.ProjectMember
  );

  const [emitAddUserToProjectEvent] = useEvent(['ADD_USER_TO_PROJECT']);
  const userRef = useRef<HTMLInputElement>(null);

  const [selectedUser, setSelectedUser] = useState<IUser>({});
  const { projectId } = useParams();

  const [usersToAddToProject, setUsersToAddToProject] = useState<
    { user: IUser; role: ProjectRole }[]
  >([]);

  const [getAllProjectUsers, { data }] = useCustomLazyQuery(
    GET_ALL_WORKSPACE_MEMBERS_NOT_IN_PROJECT(projectId),
    false
  );
  const [addUsersToProject, { data: dataAdd }] = useCustomMutation(
    ADD_USERS_TO_PROJECT,
    true
  );

  const handlePersonAddIconClick = () => {
    getAllProjectUsers();
    setOpen(true);
  };

  useEffect(() => {
    if (dataAdd) {
      emitAddUserToProjectEvent();
    }
  }, [dataAdd]);

  function handleAddUser() {
    const newdata = { user: selectedUser, role: selectedRole };

    setUsersToAddToProject((usersToAddToProject) => {
      return [...usersToAddToProject, newdata];
    });

    setSelectedUser({});
  }
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    addUsersToProject({
      variables: {
        input: {
          projectId,
          emailRoles: usersToAddToProject.map(({ user, role }) => ({
            email: user.email || '',
            role,
          })),
        },
      },
    });

    setOpen(false);
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'medium',
          }}
        >
          {' '}
          Add Members To Project
        </Typography>
        <IconButton size="large" onClick={handlePersonAddIconClick}>
          <PersonAddAltIcon />
        </IconButton>
      </Box>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: 600,
          },
        }}
        component={'form'}
        onSubmit={handleFormSubmit}
      >
        <DialogContent>
          <Paper
            sx={{
              // padding: 2,
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
              border: 0,
              boxShadow: 0,
            }}
          >
            <FormControl sx={{ width: 300, flexGrow: 2 }}>
              <InputLabel id="member-select-label">Member</InputLabel>
              <Select
                labelId="member-select-label"
                id="member-select"
                value={selectedUser}
                label="Member"
                onChange={(e) => {
                  setSelectedUser(e.target.value);
                }}
              >
                {data?.getWorkspaceMembersNotInProject.map((user) => (
                  <MenuItem key={user.id} value={user}>
                    {user.name}
                  </MenuItem>
                )) || []}
              </Select>
            </FormControl>
            <IconButton
              type="button"
              sx={
                {
                  // padding: 2,
                }
              }
              onClick={handleAddUser}
            >
              <AddOutlinedIcon />
            </IconButton>
            <Select
              sx={{
                minWidth: 120,
              }}
              onChange={(e) => {
                setSelectedRole(
                  ProjectRole[e.target.value as keyof typeof ProjectRole]
                );
              }}
              value={selectedRole}
            >
              {Object.entries(ProjectRoleMapper).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </Paper>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              flexWrap: 'wrap',
              mt: 2,
            }}
          >
            {usersToAddToProject.map(({ user }) => (
              <Chip
                key={user.email}
                label={user.email}
                onDelete={() => {
                  setUsersToAddToProject(
                    usersToAddToProject.filter(
                      (usr) => usr.user.email !== user.email
                    )
                  );
                }}
              />
            ))}
          </Box>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                borderRadius: 3,
              }}
              type="submit"
              onClick={handleFormSubmit}
            >
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
