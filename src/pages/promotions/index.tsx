import { ReactElement } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Box, Container } from '@mui/material';
import PageContainer from '@/common/components/Layout/PageContainer';
import PromotionEvent from '@/modules/promotion/components/PromotionEvent';
import { appAssets } from '@/common/assets';
import { getPromotions } from '@/services/promotionRequests';
import { getPromotionsByPercentage } from '@/utils/promotion';

function PromotionsPage({ promotions }: InferGetStaticPropsType<typeof getStaticProps>): ReactElement {
  const promotionsUpTo50 = getPromotionsByPercentage(promotions, 50);
  const promotionsUpTo70 = getPromotionsByPercentage(promotions, 50, true);

  return (
    <PageContainer barTitle="Chương trình ưu đãi" headTitle="Chương trình ưu đãi">
      <Box sx={{ mt: 6, mb: 8 }}>
        <Container maxWidth="xl">
          <PromotionEvent
            banner={appAssets.bigSale50}
            title="Vô số ưu đãi để bạn lựa chọn"
            promotions={promotionsUpTo50}
          />
          <PromotionEvent
            banner={appAssets.bigSale70}
            title="Thả ga mua sắm cho mùa hè này với ưu đãi cực khủng"
            promotions={promotionsUpTo70}
          />
        </Container>
      </Box>
    </PageContainer>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await getPromotions();

  return {
    props: {
      promotions: data.promotions,
    },
    revalidate: 60,
  };
};

export default PromotionsPage;
