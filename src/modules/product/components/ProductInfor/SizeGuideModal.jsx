import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import Button from '@/common/components/UI/Button';
import { TabContext, TabPanel } from '@mui/lab';
import ThinPersonIcon from '@/common/components/UI/ThinPersonIcon';
import NormalPersonIcon from '@/common/components/UI/NormalPersonIcon';
import FatPersonIcon from '@/common/components/UI/FatPersonIcon';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: { xs: 'translate(-50%, -50%)', md: 'translate(-50%, -42%)' },
  width: { xs: '100%', md: '700px' },
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 3,
};

export default function SizeGuideModal({ isVisible, onClose }) {
  const [value, setValue] = useState('1');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [body, setBody] = useState('thin');
  const [feeling, setFeeling] = useState('tight');
  const [selectedSize, setSelectedSize] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleHeightChange = (event, newValue) => {
    setHeight(newValue);
  };

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
  };

  const handleBodyChange = (event, newValue) => {
    setBody(newValue);
  };

  const handleFeelingChange = (event, newValue) => {
    setFeeling(newValue);
  };

  const handleChooseSize = () => {
    console.log(height, weight, body, feeling);
    setSelectedSize('XL');
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isVisible}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{ overflow: 'scroll' }}
      >
        <Fade in={isVisible}>
          <Box sx={style}>
            {!selectedSize && (
              <Box>
                <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                  Chọn size
                </Typography>
                <TabContext value={value}>
                  <Box sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
                    <Tabs value={value} onChange={handleChange} centered>
                      <Tab label="Hướng dẫn chọn size" value="1" />
                      <Tab label="Bảng size" value="2" />
                    </Tabs>
                  </Box>
                  <TabPanel value="1">
                    <Typography sx={{ textAlign: 'center', fontWeight: 400 }}>Thông số của bạn</Typography>
                    <Typography>Chiều cao</Typography>
                    <Stack direction="row" spacing={3}>
                      <Slider value={height} size="small" onChange={handleHeightChange} min={1} max={200} />
                      <Typography variant="body1">{height}cm</Typography>
                    </Stack>

                    <Typography sx={{ mt: 4 }}>Cân nặng</Typography>
                    <Stack direction="row" spacing={3}>
                      <Slider value={weight} size="small" onChange={handleWeightChange} min={1} max={150} />
                      <Typography variant="body1">{weight}kg</Typography>
                    </Stack>

                    <Typography sx={{ my: 5, textAlign: 'center', fontWeight: 400 }}>Dáng người của bạn</Typography>
                    <FormControl sx={{ width: '100%' }}>
                      <RadioGroup
                        row
                        aria-labelledby="body-group"
                        name="body-group"
                        value={body}
                        onChange={handleBodyChange}
                      >
                        <Grid container>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <ThinPersonIcon />
                            <FormControlLabel value="thin" control={<Radio />} label="Gầy" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <NormalPersonIcon />
                            <FormControlLabel value="normal" control={<Radio />} label="Bình thường" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FatPersonIcon />
                            <FormControlLabel value="fat" control={<Radio />} label="Béo" sx={{ mt: 2 }} />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>

                    <Typography sx={{ mt: 5, textAlign: 'center', fontWeight: 400 }}>Bạn muốn mặc thế nào</Typography>
                    <FormControl sx={{ width: '100%' }}>
                      <RadioGroup
                        row
                        aria-labelledby="body-group"
                        name="body-group"
                        value={feeling}
                        onChange={handleFeelingChange}
                      >
                        <Grid container>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="tight" control={<Radio />} label="Mặc Ôm" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="fit" control={<Radio />} label="Mặc vừa" sx={{ mt: 2 }} />
                          </Grid>
                          <Grid item xs={4} sx={{ textAlign: 'center', '& svg': { mx: 'auto' } }}>
                            <FormControlLabel value="wide" control={<Radio />} label="Mặc rộng" sx={{ mt: 2 }} />
                          </Grid>
                        </Grid>
                      </RadioGroup>
                    </FormControl>

                    <Box sx={{ textAlign: 'center', mt: 3 }}>
                      <Button className="rounded-none px-10" onClick={handleChooseSize}>
                        Tìm size
                      </Button>
                    </Box>
                  </TabPanel>
                  <TabPanel value="2">Item Two</TabPanel>
                </TabContext>
              </Box>
            )}
            {selectedSize && (
              <Box>
                <Typography id="transition-modal-title" variant="h5" component="h2" sx={{ textAlign: 'center' }}>
                  Size phù hợp với bạn
                </Typography>
                <Box sx={{ textAlign: 'center', my: 6 }}>
                  <Typography sx={{ px: 4, py: 1, border: '1px solid #111111', display: 'inline-block' }}>
                    {selectedSize}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
