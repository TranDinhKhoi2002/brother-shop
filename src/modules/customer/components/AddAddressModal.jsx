import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IconButton, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import AddAddressForm from './AddAddressForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: { xs: 'translate(-50%, -50%)', md: 'translate(-50%, -42%)' },
  width: { xs: '95%', md: '600px' },
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 3,
};

function AddAddressModal({ address, isVisible, onClose }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isVisible}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ overflowY: 'scroll' }}
      >
        <Fade in={isVisible}>
          <Box sx={style}>
            <IconButton sx={{ position: 'absolute', right: 30, top: 17 }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Box>
              <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                Thêm địa chỉ
              </Typography>
              <AddAddressForm address={address} onClose={onClose} />
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddAddressModal;
