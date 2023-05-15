import React, { useImperativeHandle, useState } from 'react';
import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default React.forwardRef(function NumberBox(props, ref) {
  const { max, min } = props;
  const [localValue, setLocalValue] = useState(1);

  useImperativeHandle(ref, () => ({
    getQuantity: () => {
      return localValue;
    },
  }));

  const handleInputChange = (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= min && newValue <= max) {
      setLocalValue(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = localValue + 1;
    if (newValue <= max) {
      setLocalValue(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = localValue - 1;
    if (newValue >= min) {
      setLocalValue(newValue);
    }
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        width: '150px',
        height: '50px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '5px',
      }}
    >
      <IconButton onClick={handleDecrement} disabled={localValue <= min}>
        <RemoveIcon />
      </IconButton>
      <input
        className="outline-none"
        value={localValue}
        onChange={handleInputChange}
        type="number"
        style={{ width: '100%', textAlign: 'center' }}
      />
      <IconButton onClick={handleIncrement} disabled={localValue >= max}>
        <AddIcon />
      </IconButton>
    </Stack>
  );
});
