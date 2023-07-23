import { Box } from '@mui/material';
import PageContainer from '@/common/components/Layout/PageContainer';
import ProfileTabs from '@/modules/customer/components/ProfileTabs';

function ProfilePage() {
  return (
    <PageContainer barTitle="Thông tin tài khoản" headTitle="Thông tin tài khoản">
      <Box sx={{ mt: 6, mb: 8 }}>
        <ProfileTabs />
      </Box>
    </PageContainer>
  );
}

export default ProfilePage;
