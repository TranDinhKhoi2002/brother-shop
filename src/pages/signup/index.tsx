import { ReactElement, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import PageContainer from '@/common/components/Layout/PageContainer';
import SignupForm from '@/modules/auth/components/SignupForm';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { updateBrandNewBreadcrumb } from '@/redux/slices/breadcrumb';
import config from '@/config';

function SignupPage(): ReactElement {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      updateBrandNewBreadcrumb({
        item: {
          id: `signup`,
          url: config.routes.signup,
          name: 'Đăng Ký',
        },
      }),
    );
  }, [dispatch]);

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
