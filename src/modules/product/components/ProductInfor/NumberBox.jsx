import React, { useImperativeHandle, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, IconButton, Input } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '150px',
    height: '50px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
  },
  input: {
    width: '100%',
    textAlign: 'center',
    border: 'none',
  },
  iconButton: {
    width: '30px',
    height: '30px',
    color: '#666',
  },
});

export default React.forwardRef(function NumberBox(props, ref) {
  const { max, min } = props;
  const classes = useStyles();
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
    <Box className={classes.root}>
      <IconButton onClick={handleDecrement} disabled={localValue <= min} className={classes.iconButton}>
        <RemoveIcon />
      </IconButton>
      <Input
        value={localValue}
        onChange={handleInputChange}
        type="number"
        inputProps={{
          min,
          max,
          className: classes.input,
        }}
      />
      <IconButton onClick={handleIncrement} disabled={localValue >= max} className={classes.iconButton}>
        <AddIcon />
      </IconButton>
    </Box>
  );
});
