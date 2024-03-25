import { useRef } from 'react';
import { toast } from 'react-toastify';
import FormOTPView from './view';

type FormOTPProps = {
  onSubmit: (_otpCode: string) => void;
};

function FormOTP({ onSubmit }: FormOTPProps) {
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleKeyPress = (index: number) => () => {
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

  return <FormOTPView inputRefs={inputRefs} onCheckEnteredOTP={checkEnteredOTP} onKeyUp={handleKeyPress} />;
}

export default FormOTP;
