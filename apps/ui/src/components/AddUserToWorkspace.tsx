import { FC, useRef, useState } from 'react';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';
import { WorkspaceRole } from '../__generated__/graphql';
import { useCustomMutation } from '../hooks/useCustomMutation';
import { ADD_USERS_TO_WORKSPACE } from '../services/workspace/workspaceMutations';
import { useParams } from 'react-router-dom';

const workspaceRoleMapper: Record<WorkspaceRole, string> = {
  [WorkspaceRole.WORKSPACE_ADMIN]: 'Admin',
  [WorkspaceRole.WORKSPACE_EDITOR]: 'Editor',
  [WorkspaceRole.WORKSPACE_MEMBER]: 'Member',
};

export const AddUserToWorkspace: FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<WorkspaceRole>(
    WorkspaceRole.WORKSPACE_MEMBER
  );
  const { workspaceId } = useParams();
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const emailsRef = useRef<{ email: string; role: WorkspaceRole }[]>([]);
  const [addUsersToWorkspace] = useCustomMutation(ADD_USERS_TO_WORKSPACE, true);

  function handleAddUser() {
    const newdata = { email: selectedUser, role: selectedRole };
    setEmails([...emails, selectedUser]);
    emailsRef.current.push(newdata);
    setSelectedUser('');
  }
  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addUsersToWorkspace({
      variables: {
        input: {
          workspaceId,
          emailRoles: emailsRef.current,
        },
      },
    });

    setOpen(false);
  }

  return (
    <>
      <IconButton size="large" onClick={() => setOpen(true)}>
        <PersonAddAltIcon />
      </IconButton>
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
        <DialogTitle>Add user to workspace</DialogTitle>
        <DialogContent>
          <Paper
            sx={{
              // padding: 2,
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <InputBase
              value={selectedUser}
              sx={{
                flex: 1,
                ml: 1,
              }}
              placeholder="Add user email"
              onChange={(e) => setSelectedUser(e.target.value)}
            />
            <IconButton
              type="button"
              sx={{
                padding: 2,
              }}
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
                  WorkspaceRole[e.target.value as keyof typeof WorkspaceRole]
                );
              }}
              value={selectedRole}
            >
              {Object.entries(workspaceRoleMapper).map(([key, value]) => (
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
            {emails.map((email) => (
              <Chip
                key={email}
                label={email}
                onDelete={() => {
                  setEmails(emails.filter((e) => e !== email));
                  emailsRef.current = emailsRef.current.filter(
                    (e) => e.email !== email
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
