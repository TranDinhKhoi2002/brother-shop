import { Box, Container } from '@mui/material';
import PageContainer from '@/common/components/Layout/PageContainer';
import PromotionEvent from '@/modules/promotion/components/PromotionEvent';
import { appAssets } from '@/common/assets';
import { getPromotions } from '@/services/promotionRequests';

function PromotionsPage({ promotions }) {
  return (
    <PageContainer barTitle="Chương trình ưu đãi" headTitle="Thông tin tài khoản">
      <Box sx={{ mt: 6, mb: 8 }}>
        <Container maxWidth="xxl">
          <PromotionEvent banner={appAssets.bigSale50} title="Vô số ưu đãi để bạn lựa chọn" promotions={promotions} />
          <PromotionEvent
            banner={appAssets.bigSale60}
            title="Thả ga mua sắm cho mùa hè này với ưu đãi cực khủng"
            promotions={promotions}
          />
        </Container>
      </Box>
    </PageContainer>
  );
}

export async function getStaticProps() {
  const data = await getPromotions();

  return {
    props: {
      promotions: data.promotions,
    },
    revalidate: 60,
  };
}

export default PromotionsPage;
