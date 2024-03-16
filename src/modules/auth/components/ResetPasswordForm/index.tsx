import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { requestNewPassword } from '@/services/auth';
import { RequestNewPasswordPayload } from '@/services/types/auth';
import config from '@/config';
import { ResetPasswordSchema, defaultValues } from './validation';

function ResetPasswordForm() {
  const router = useRouter();

  const { mutate: requestNewPasswordMutation } = useMutation({
    mutationFn: ({ email, isCustomer }: RequestNewPasswordPayload) => requestNewPassword({ email, isCustomer }),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      router.push(config.routes.login);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: { email: string }) => {
    const { email } = values;
    requestNewPasswordMutation({ email, isCustomer: true });
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
        <LoadingButton type="submit" fullWidth loading={isSubmitting} sx={{ mt: 1 }}>
          Xác nhận
        </LoadingButton>
      </FormProvider>
    </Box>
  );
}

export default ResetPasswordForm;
