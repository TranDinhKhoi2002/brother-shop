import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { appAssets } from '@/common/assets';
import Link from 'next/link';
import config from '@/config';

function HomeCarousel() {
  return (
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
      <Link href={config.routes.promotions}>
        <div className="animate-image flex justify-center pt-[64px] lg:pt-[79px] xl:h-[1000px]">
          <Image alt="Discount" src={appAssets.banner6} width={1400} height={1000} priority />
        </div>
      </Link>
      <Link href={config.routes.promotions}>
        <div className="animate-image flex justify-center pt-[64px] lg:pt-[79px] xl:h-[1000px]">
          <Image alt="Discount" src={appAssets.banner9} width={1400} height={1000} priority />
        </div>
      </Link>
    </Carousel>
  );
}

export default HomeCarousel;
