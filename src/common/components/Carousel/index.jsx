import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import CarouselItem from './CarouselItem';

function MainCarousel({ events }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading....</p>;
  }

  const content = [];
  for (let i = 0; i < events.length - 1; i++) {
    content.push(<CarouselItem key={i} item1={events[i]} item2={events[i + 1]} />);
  }

  console.log(content);

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
      {content}
    </Carousel>
  );
}

export default MainCarousel;
