import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCustomMutation } from '../hooks/useCustomMutation';
import { useParams } from 'react-router-dom';
import { CREATE_MILESTONE } from '../services/milestone/milestoneMutations';
import useEvent from '../hooks/useEvent';

const AddSprint = React.forwardRef((props, ref) => {
  const { projectId } = useParams();

  const [createMilestone, { data }] = useCustomMutation(CREATE_MILESTONE, true);
  const [emitCreateSprint] = useEvent(['CREATE_MILESTONE']);
  const [open, setOpen] = React.useState(false);
  React.useImperativeHandle(ref, () => ({
    setOpen,
  }));
  React.useEffect(() => {
    if (data) {
      emitCreateSprint();
    }
  }, [data]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
          createMilestone({
            variables: {
              input: formJson,
              projectId: projectId,
            },
          });
          handleClose();
        },
      }}
    >
      <DialogTitle>Add a new milestone</DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <DialogContentText>
          Please fill in the form to create a new milestone
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Milestone Name"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="description"
          name="description"
          label="Milestone Description"
          fullWidth
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="start-date"
          name="startDate"
          label="Start Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            marginTop: '1rem',
          }}
        />
        <TextField
          sx={{
            marginTop: '1rem',
          }}
          required
          margin="dense"
          id="end-date"
          name="endDate"
          label="End Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Create</Button>
      </DialogActions>
    </Dialog>
  );
});

export { AddSprint };
