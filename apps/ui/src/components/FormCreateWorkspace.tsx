import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  TextField,
} from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const CreateWorkspaceSchame = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});

type CreateWorkspaceType = yup.InferType<typeof CreateWorkspaceSchame>;

export const FormCreateWorkspace: FC = () => {
  const [open, setOpen] = useState(false);
  const { handleSubmit, control } = useForm<CreateWorkspaceType>({
    resolver: yupResolver(CreateWorkspaceSchame),
  });

  const onSubmitForm = (data: CreateWorkspaceType) => {
    console.log('data workspace ', data);
    return;
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          borderRadius: 3,
        }}
        onClick={() => setOpen(true)}
      >
        Create Workspace
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
        component="form"
        sx={{
          '& .MuiDialog-paper': {
            width: '100%',
            maxWidth: 400,
          },
        }}
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <DialogTitle>Create a new workspace</DialogTitle>
        <DialogContent>
          <InputLabel
            htmlFor="name"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 12,
              marginBottom: 1,
              marginTop: 1,
            }}
          >
            Name
          </InputLabel>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                sx={{ marginBottom: 1 }}
                id="name"
                type="text"
                placeholder='e.g. "My workspace"'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            placeholder='e.g. "My workspace"'
            type="text"
            fullWidth
            required
          /> */}
          <InputLabel
            htmlFor="description"
            sx={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 12,
              marginBottom: 1,
            }}
          >
            Description
          </InputLabel>
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="description"
                type="text"
                placeholder='e.g. "My personal workspace"'
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          {/* <TextField
            margin="dense"
            id="description"
            type="text"
            placeholder='e.g. "My personal workspace"'
            fullWidth
            required
          /> */}
        </DialogContent>
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
