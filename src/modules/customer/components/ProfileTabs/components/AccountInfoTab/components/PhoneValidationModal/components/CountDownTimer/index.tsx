import { Typography } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';

type CountDownTimerProps = {
  onCounterExpired: () => void;
};

function CountDownTimer({ onCounterExpired }: CountDownTimerProps): ReactElement {
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
