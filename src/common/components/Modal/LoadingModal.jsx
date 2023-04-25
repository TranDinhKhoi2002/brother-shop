import * as React from 'react';
import { Modal, Box, CircularProgress } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'transparent',
  p: 4,
  textAlign: 'center',
};

export default function LoadingModal({ isOpen, onClose }) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CircularProgress color="info" />
        </Box>
      </Modal>
    </div>
  );
}
