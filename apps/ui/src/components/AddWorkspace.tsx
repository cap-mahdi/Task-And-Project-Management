import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CREATE_WORKSPACE } from '../services/workspace/workspaceMutations';
import { useCustomMutation } from '../hooks/useCustomMutation';
import useAppContext from '../context/useAppContext';
import useEvent from '../hooks/useEvent';

const AddWorkspace = React.forwardRef((props, ref) => {
  const [globalState, setGlobalState] = useAppContext();
  const [createWorkspace, { data }] = useCustomMutation(CREATE_WORKSPACE, true);
  const [emitCreateWorkspace] = useEvent(['CREATE_WORKSPACE']);
  const [open, setOpen] = React.useState(false);
  React.useImperativeHandle(ref, () => ({
    setOpen,
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    if (data) {
      emitCreateWorkspace();
    }
  }, [data]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries((formData as any).entries());
          console.log(formJson);
          createWorkspace({
            variables: {
              input: formJson,
            },
          });
          handleClose();
        },
      }}
    >
      <DialogTitle>Add a new workspace</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the form to create a new workspace
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Workspace Name"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="description"
          name="description"
          label="Workspace Description"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
});

export { AddWorkspace };
