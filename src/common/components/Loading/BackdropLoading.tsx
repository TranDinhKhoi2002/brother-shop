import { Backdrop, CircularProgress } from '@mui/material';
import { ReactElement } from 'react';

type BackdropLoadingProps = {
  isVisible: boolean;
};

function BackdropLoading({ isVisible }: BackdropLoadingProps): ReactElement {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isVisible}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default BackdropLoading;
