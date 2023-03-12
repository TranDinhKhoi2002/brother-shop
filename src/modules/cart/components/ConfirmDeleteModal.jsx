import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@/common/components/UI/Button';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Stack } from '@mui/material';

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

export default function ConfirmDeleteModal({ isOpen, onClose, onDelete }) {
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
            Xóa sản phẩm?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng chứ?
          </Typography>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            <Button variant="text" className="text-[#111] border-[#111] !bg-white" onClick={onClose}>
              Đóng
            </Button>
            <Button variant="contained" onClick={onDelete}>
              Xóa
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
