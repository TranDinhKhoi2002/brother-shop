import Button from '@/common/components/UI/Button';
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import CountDownTimer from './CountdownTimer';

function FormOTP({ onSubmit }) {
  const [counterExpired, setCounterExpired] = useState(false);

  const inputRefs = useRef([]);

  const handleKeyPress = (index) => () => {
    if (index === 5) return;

    const nextIndex = index + 1;
    inputRefs.current[nextIndex].focus();
  };

  const checkEnteredOTP = () => {
    const values = [...Array(6)].map((_, index) => inputRefs.current[index].value);
    const enteredOTP = values.join('');

    if (enteredOTP.length < 6) {
      toast.error('Vui lòng nhập đầy đủ mã xác minh');
      return;
    }

    if (isNaN(parseInt(enteredOTP))) {
      toast.error('Mã xác minh không hợp lệ');
      return;
    }

    onSubmit(enteredOTP);
  };

  return (
    <Box>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 3, px: { xs: 0, md: 3 } }}>
        {[...Array(6)].map((_, index) => (
          <TextField
            key={index}
            variant="standard"
            inputProps={{
              maxLength: 1,
              min: 0,
              style: { textAlign: 'center', fontSize: 20 },
              onKeyUp: handleKeyPress(index),
            }}
            inputRef={(ref) => (inputRefs.current[index] = ref)}
            type="tel"
          />
        ))}
      </Stack>

      {counterExpired ? (
        <Typography sx={{ mt: 6 }}>
          Bạn vẫn chưa nhận được? <strong className="cursor-pointer">Gửi lại</strong>
        </Typography>
      ) : (
        <CountDownTimer onCounterExpired={() => setCounterExpired(true)} />
      )}

      <Button fullWidth className="mt-8" onClick={checkEnteredOTP}>
        Xác nhận
      </Button>
    </Box>
  );
}

export default FormOTP;
