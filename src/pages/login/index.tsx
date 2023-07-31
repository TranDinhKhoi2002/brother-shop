import PageContainer from '@/common/components/Layout/PageContainer';
import LoginForm from '@/modules/auth/components/LoginForm';
import { Box, Container } from '@mui/material';
import { ReactElement } from 'react';

function LoginPage(): ReactElement {
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
