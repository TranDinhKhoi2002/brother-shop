import { ReactElement, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { Image } from 'cloudinary-react';
import { LightgalleryProvider, LightgalleryItem } from 'react-lightgallery';
import BackdropLoading from '../Loading/BackdropLoading';

type IntroProps = {
  images: {
    public_id: string;
    url: string;
  }[];
};

function Intro({ images }: IntroProps): ReactElement {
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  return (
    <LightgalleryProvider>
      <Grid container spacing={1} sx={{ mt: 6 }}>
        {images.map((image) => (
          <Grid item xs={6} md={3} key={image.public_id}>
            <LightgalleryItem group="intro" src={image.url} thumb={image.url}>
              <Image
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={image.public_id}
                alt=""
                style={{ cursor: 'pointer' }}
              />
            </LightgalleryItem>
          </Grid>
        ))}
      </Grid>
    </LightgalleryProvider>
  );
}

export default Intro;
