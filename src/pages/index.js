import Head from 'next/head';
import Image from 'next/image';
import config from '../config';
import MainCarousel from '@/common/components/Carousel';
import Intro from '@/common/components/Intro';
import Products from '@/modules/product/components/Products';
import Button from '@/common/components/Buttons/Button';

import { getDiscountProducts, getHotProducts, getProductsByType } from '@/services/productRequests';
import { getIntroImages } from '@/services/imageRequests';
import { getReadyToSellEvent } from '@/services/eventRequests';

import 'lightgallery.js/dist/css/lightgallery.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useRouter } from 'next/router';
import { Carousel } from 'react-responsive-carousel';
import { Box, Stack, Typography } from '@mui/material';

export default function Home({
  hotProducts,
  discountProducts,
  tshirtProducts,
  trouserProducts,
  introImages,
  readyToSellEvent,
}) {
  const router = useRouter();

  const navigateToProductsPage = (type) => {
    router.push(`${config.routes.products}?type=${type}`);
  };

  return (
    <>
      <Head>
        <title>Brother Shop - Cửa Hàng Online Quần Áo Thời Trang Nam Nữ</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="xl:px-[3%]">
        <Carousel
          showThumbs={false}
          emulateTouch={true}
          animationHandler="slide"
          autoPlay={true}
          interval={3000}
          infiniteLoop={true}
          showArrows={true}
          showStatus={false}
          stopOnHover={false}
        >
          <div className="animate-image flex justify-center pt-[64px] lg:pt-[79px]">
            <Image alt="Discount" src="/assets/images/banner1.jpg" width={1400} height={1000} priority />
          </div>
          <div className="animate-image flex justify-center pt-[70px] lg:pt-[79px]">
            <Image alt="Discount" src="/assets/images/banner2.jpg" width={1400} height={1000} priority />
          </div>
        </Carousel>
        <MainCarousel events={readyToSellEvent} />
        <Intro images={introImages} />
        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ pt: 5, pb: 1, fontSize: '1.5rem' }} variant="body2">
            Top sản phẩm HOT
          </Typography>
          <Typography sx={{ fontWeight: 'light' }}>Những sản phẩm thời trang mới nhất/Hot nhất</Typography>
        </Box>
        <Products products={hotProducts} />
        <Stack justifyContent="center">
          <Image
            src="https://cmsv2.yame.vn/uploads/91ecb60f-ecf4-4572-9a80-7ba29483cd97/Banner_MB_13.01_(G)_02.jpg?quality=80&w=0&h=0"
            alt=""
            width={1000}
            height={1000}
            className="w-full"
          />
        </Stack>
        <Products products={tshirtProducts} />
        <Box sx={{ textAlign: 'center', marginY: 3 }}>
          <Button onClick={navigateToProductsPage.bind(this, 'Áo Thun')}>Xem tất cả áo thun</Button>
        </Box>
        <Stack justifyContent="center" sx={{ mt: 3 }}>
          <Image
            src="https://cmsv2.yame.vn/uploads/7c59b59c-11d3-44ae-b7b0-aa93b9a7deec/Thum_MB_06.01_(04).jpg?quality=80&w=0&h=0"
            alt=""
            width={1000}
            height={1000}
            className="w-full"
          />
        </Stack>
        <Products products={trouserProducts} />
        <Box sx={{ textAlign: 'center', marginY: 3 }}>
          <Button onClick={navigateToProductsPage.bind(this, 'Quần')}>Xem tất cả quần</Button>
        </Box>
        <Box sx={{ textAlign: 'center', marginY: 3 }}>
          <Typography sx={{ pt: 5, pb: 1, fontSize: '1.5rem' }} variant="body2">
            Các sản phẩm giảm giá
          </Typography>
          <Typography sx={{ fontWeight: 'light' }}>Đừng bỏ lỡ - Hãy mua ngay</Typography>
        </Box>
        <Products products={discountProducts} />
        {/* <MessengerCustomerChat pageId="105303191985068" appId="214383791186436" /> */}
      </main>
    </>
  );
}

export async function getStaticProps() {
  const promises = [
    getHotProducts(),
    getDiscountProducts(),
    getProductsByType('Áo Thun'),
    getProductsByType('Quần'),
    getIntroImages(),
    getReadyToSellEvent(),
  ];
  const [hotProducts, discountProducts, tshirtProducts, trouserProducts, introImages, readyToSellEvent] =
    await Promise.all(promises);

  return {
    props: {
      hotProducts,
      discountProducts,
      tshirtProducts,
      trouserProducts,
      introImages,
      readyToSellEvent,
    },
  };
}
