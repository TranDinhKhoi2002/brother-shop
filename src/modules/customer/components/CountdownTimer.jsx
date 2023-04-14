import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

function CountDownTimer({ onCounterExpired }) {
  const [counter, setCounter] = useState(60);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else {
      onCounterExpired();
    }
  }, [counter, onCounterExpired]);

  return <Typography sx={{ mt: 5 }}>Bạn vui lòng chờ trong {counter} giây để có thể nhận lại mã</Typography>;
}

export default CountDownTimer;
