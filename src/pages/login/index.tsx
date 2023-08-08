import { ReactElement, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateBrandNewBreadcrumb } from '@/redux/slices/breadcrumb';
import LoginForm from '@/modules/auth/components/LoginForm';
import PageContainer from '@/common/components/Layout/PageContainer';
import config from '@/config';

function LoginPage(): ReactElement {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateBrandNewBreadcrumb({ item: { id: 'login', url: config.routes.login, name: 'Đăng nhập' } }));
  }, [dispatch]);

  return (
    <PageContainer barTitle="Đăng nhập" headTitle="Đăng Nhập">
      <Box sx={{ my: 10 }}>
        <Container maxWidth="sm">
          <LoginForm />
        </Container>
      </Box>
    </PageContainer>
  );
}

export default LoginPage;
