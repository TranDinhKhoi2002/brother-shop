import * as React from 'react';
import { Stack, Typography, Modal, Box } from '@mui/material';
import Button from '@/common/components/Buttons/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({ isOpen, title, subTitle, confirmTextBtn, onClose, onConfirm }) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {subTitle}
          </Typography>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Button variant="text" className="text-[#111] border-[#111] !bg-white" onClick={onClose}>
              Đóng
            </Button>
            <Button variant="contained" onClick={onConfirm}>
              {confirmTextBtn}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}