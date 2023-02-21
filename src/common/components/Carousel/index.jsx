import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';
import { Image } from 'cloudinary-react';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';

function MainCarousel({ events }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading....</p>;
  }

  return (
    <Carousel
      showThumbs={false}
      swipeable={true}
      emulateTouch={true}
      animationHandler="slide"
      autoPlay={true}
      interval={3000}
      infiniteLoop={true}
      showArrows={false}
      showStatus={false}
      stopOnHover={false}
    >
      {events.map((event, index) => (
        <div key={index} className="grid grid-cols-1 mx-[4px] gap-1 animate-image mt-8">
          <LightgalleryProvider>
            <h4 className="inline-block md:float-left font-normal lg:text-2xl pb-3 text-[#444444] hover:text-[#0056b3] transition duration-300">
              <Link href={`/events/${event.tag}`}>{event.title}</Link>
            </h4>
            <Image cloudName="ddajkcbs2" publicId={event.mainImg} alt={event.title} />

            <div className="grid grid-cols-4 gap-1">
              {event.relatedProducts.map((product, index) => (
                <LightgalleryItem
                  key={index}
                  group="mainCarousel"
                  src={`https://res.cloudinary.com/ddajkcbs2/image/upload/${product.images.mainImg}`}
                  thumb={`https://res.cloudinary.com/ddajkcbs2/image/upload/${product.images.mainImg}`}
                >
                  <Image cloudName="ddajkcbs2" publicId={product.images.mainImg} alt="" />
                </LightgalleryItem>
              ))}
            </div>
          </LightgalleryProvider>
        </div>
      ))}
    </Carousel>
  );
}

export default MainCarousel;
