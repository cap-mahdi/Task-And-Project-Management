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

const workspaceRoleMapper: Record<WorkspaceRole, string> = {
  [WorkspaceRole.WorkspaceAdmin]: 'Admin',
  [WorkspaceRole.WorkspaceEditor]: 'Editor',
  [WorkspaceRole.WorkspaceMember]: 'Member',
};

export const AddUserToWorkspace: FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<WorkspaceRole>(
    WorkspaceRole.WorkspaceMember
  );
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [emails, setEmails] = useState<string[]>([]);
  const emailsRef = useRef<{ email: string; role: WorkspaceRole }[]>([]);

  function handleAddUser() {
    const newdata = { email: selectedUser, role: selectedRole };
    setEmails([...emails, selectedUser]);
    emailsRef.current.push(newdata);
    setSelectedUser('');
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
        onSubmit={(e) => {
          e.preventDefault();
          console.log(emailsRef.current);
          setOpen(false);
        }}
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
              onChange={(e) => setSelectedRole(e.target.value as WorkspaceRole)}
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
            >
              Add
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};
