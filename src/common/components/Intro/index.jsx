import { Image } from 'cloudinary-react';
import { useEffect, useState } from 'react';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';

function Intro({ images }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading....</p>;
  }

  return (
    <LightgalleryProvider>
      <div className="grid grid-cols-2 md:grid-cols-4 mt-6 gap-2">
        {images.map((image) => (
          <div key={image.public_id} className="cursor-pointer">
            <LightgalleryItem group="intro" src={image.url} thumb={image.url}>
              <Image cloudName="ddajkcbs2" publicId={image.public_id} alt="" />
            </LightgalleryItem>
          </div>
        ))}
      </div>
    </LightgalleryProvider>
  );
}

export default Intro;
