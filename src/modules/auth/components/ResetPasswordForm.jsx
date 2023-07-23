import { Box, Typography } from '@mui/material';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import * as authServices from '@/services/authRequests.ts';
import { toast } from 'react-toastify';
import config from '@/config';

function ResetPasswordForm() {
  const router = useRouter();

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const { email } = values;
    const { success, message } = await authServices.requestNewPassword({ email, isCustomer: true });

    if (success) {
      toast.success(message);
      router.push(config.routes.login);
    } else {
      toast.error(message);
    }
  };

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Khôi phục mật khẩu
      </Typography>
      <Typography sx={{ textAlign: 'center', width: { xs: '80%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}>
        Chúng tôi sẽ gửi một email khôi phục mật khẩu đến bạn
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="email" label="Email" placeholder="Địa chỉ email" />
        <LoadingButton fullWidth type="submit" loading={isSubmitting} sx={{ mt: 1 }}>
          Xác nhận
        </LoadingButton>
      </FormProvider>
    </Box>
  );
}

export default ResetPasswordForm;
