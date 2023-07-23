import PageContainer from '@/common/components/Layout/PageContainer';
import LoginForm from '@/modules/auth/components/LoginForm';
import { Box, Container } from '@mui/material';

function LoginPage() {
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
