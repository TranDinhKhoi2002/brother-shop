import PageContainer from '@/common/components/Layout/PageContainer';
import SignupForm from '@/modules/auth/components/SignupForm';
import { Box, Container } from '@mui/material';

function SignupPage() {
  return (
    <PageContainer barTitle="Đăng ký" headTitle="Đăng Ký">
      <Box sx={{ my: 10 }}>
        <Container maxWidth="sm">
          <SignupForm />
        </Container>
      </Box>
    </PageContainer>
  );
}

export default SignupPage;
