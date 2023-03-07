import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import PropTypes from 'prop-types';

function DeliveryMethods({ onChange, method }) {
  return (
    <FormControl sx={{ '.css-1ol09wb-MuiButtonBase-root-MuiRadio-root.Mui-checked': { color: '#ee4266' } }}>
      <FormLabel id="demo-controlled-radio-buttons-group">Chọn hình thức nhận hàng</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={method}
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel value="cod" control={<Radio />} label="Nhận hàng tại nhà/công ty/bưu điện" />
        <FormControlLabel value="in-store" control={<Radio />} label="Nhận hàng tại cửa hàng YaMe gần nhất" />
      </RadioGroup>
    </FormControl>
  );
}

DeliveryMethods.propTypes = {
  onChange: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
};

export default DeliveryMethods;
