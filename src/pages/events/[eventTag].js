import { Image } from 'cloudinary-react';
import { useRouter } from 'next/router';

import { getEventByTag, getReadyToSellEvent } from '@/services/eventRequests';
import RelatedProducts from '@/modules/product/components/RelatedProducts';
import PageContainer from '@/common/components/Layout/PageContainer';

function DetailEvent({ event }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { title, description, subImgs, relatedProducts } = event;
  const headTitle = `Sự Kiện ${title} | Brother Shop`;

  return (
    <PageContainer barTitle={title} headTitle={headTitle}>
      <p className="px-3 xl:px-0 my-5">{description}</p>
      {subImgs.map((img) => (
        <div key={img}>
          <Image cloudName="ddajkcbs2" publicId={img} alt="" />
        </div>
      ))}

      <RelatedProducts products={relatedProducts} />
    </PageContainer>
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
