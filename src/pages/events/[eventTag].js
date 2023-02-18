import NavigationLayout from '@/common/components/Layout/NavigationLayout';
import Products from '@/modules/product/components/Products';
import { Image } from 'cloudinary-react';
import Head from 'next/head';
import { getEventByTag, getReadyToSellEvent } from '@/services/eventRequests';

function DetailEvent({ event }) {
  const { title, description, subImgs, relatedProducts } = event;
  const headTitle = `Sự Kiện ${title} | Brother Shop`;

  return (
    <>
      <Head>
        <title>{headTitle}</title>
      </Head>
      <NavigationLayout title={title}>
        <p className="px-3 xl:px-0 my-5">{description}</p>
        {subImgs.map((img) => (
          <div key={img}>
            <Image cloudName="ddajkcbs2" publicId={img} alt="" />
          </div>
        ))}

        <p className="text-center text-2xl font-medium my-3">Sản phẩm liên quan</p>
        <Products products={relatedProducts} />
      </NavigationLayout>
    </>
  );
}

export async function getStaticPaths() {
  const events = await getReadyToSellEvent();
  const eventTags = events.map((event) => ({ params: { eventTag: event.tag } }));

  return {
    paths: eventTags,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const eventTag = context.params.eventTag;
  const event = await getEventByTag(eventTag);

  return {
    props: {
      event,
    },
  };
}

export default DetailEvent;
