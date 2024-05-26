import { Typography, Button, Box, Modal, Stack, Divider } from '@mui/material';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        pb: 1,
      }}
    >
      <Box sx={{ width: '30%', fontSize: '16px' }}>
        <Typography fontWeight={'bold'}>Public profile</Typography>
      </Box>
      <Box sx={{ width: '70%', pl: 2 }}>
        <Typography sx={{ my: 5 }}>
          Delete your account and all of your source data. This is irreversible
        </Typography>

        <Button onClick={handleOpen} variant="outlined" color="error">
          Delete account
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to delete your account?
            </Typography>
            <Stack
              direction="column"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={1}
            >
              <Button onClick={handleOpen}>Delete</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </Stack>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
