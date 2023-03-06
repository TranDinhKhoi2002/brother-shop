import { Grid } from '@mui/material';
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
      <Grid container spacing={1} sx={{ mt: 6 }}>
        {images.map((image) => (
          <Grid item xs={6} md={3} key={image.public_id}>
            <LightgalleryItem group="intro" src={image.url} thumb={image.url}>
              <Image cloudName="ddajkcbs2" publicId={image.public_id} alt="" style={{ cursor: 'pointer' }} />
            </LightgalleryItem>
          </Grid>
        ))}
      </Grid>
    </LightgalleryProvider>
  );
}

export default Intro;
