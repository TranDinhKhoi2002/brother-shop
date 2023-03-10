import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';

import * as authServices from '@/services/authRequests';
import PageContainer from '@/common/components/Layout/PageContainer';
import ChangePasswordForm from '@/modules/auth/components/ChangePasswordForm';

function ChangePasswordPage({ isValidToken }) {
  const router = useRouter();

  if (!isValidToken) {
    router.replace('/');
    return;
  }

  return (
    <PageContainer barTitle="Đặt lại mật khẩu" headTitle="Đặt Lại Mật Khẩu">
      <Box sx={{ my: 10 }}>
        <Container maxWidth="sm">
          <ChangePasswordForm />
        </Container>
      </Box>
    </PageContainer>
  );
}

export async function getServerSideProps(context) {
  const token = context.params.token;
  const isValidToken = await authServices.checkResetToken({ token });

  return {
    props: {
      isValidToken,
    },
  };
}

export default ChangePasswordPage;
