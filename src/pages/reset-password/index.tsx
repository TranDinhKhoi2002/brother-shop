import { ReactElement, useEffect } from 'react';
import PageContainer from '@/common/components/Layout/PageContainer';
import ResetPasswordForm from '@/modules/auth/components/ResetPasswordForm';
import { Box, Container } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import config from '@/config';
import { updateBrandNewBreadcrumb } from '@/redux/slices/breadcrumb';

function ResetPasswordPage(): ReactElement {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateBrandNewBreadcrumb({
        item: { id: 'resetPassword', url: config.routes.resetPassword, name: 'Khôi phục mật khẩu' },
      }),
    );
  }, [dispatch]);

  return (
    <PageContainer barTitle="Khôi phục mật khẩu" headTitle="Khôi Phục Mật Khẩu">
      <Box sx={{ my: 10 }}>
        <Container maxWidth="sm">
          <ResetPasswordForm />
        </Container>
      </Box>
    </PageContainer>
  );
}

export default ResetPasswordPage;
