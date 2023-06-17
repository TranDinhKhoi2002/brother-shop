import { Backdrop, CircularProgress } from '@mui/material';

function BackdropLoading({ isVisible }) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isVisible}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default BackdropLoading;
