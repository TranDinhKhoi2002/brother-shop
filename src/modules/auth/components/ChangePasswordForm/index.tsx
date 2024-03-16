import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { Box, Typography } from '@mui/material';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import FormProvider from '@/common/components/Form/FormProvider';
import { updatePassword } from '@/services/auth';
import { UpdatePasswordPayload } from '@/services/types/auth';
import config from '@/config';
import { ChangePasswordSchema, defaultValues } from './validation';

function ChangePasswordForm() {
  const router = useRouter();
  const token = router.query.token as string;

  const { mutate: updatePasswordMutation } = useMutation({
    mutationFn: (data: UpdatePasswordPayload) => updatePassword(data),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      router.replace(config.routes.login);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = (values: { password: string; confirmPassword: string }) => {
    const { password, confirmPassword } = values;
    const data = { token, password, confirmPassword };
    updatePasswordMutation(data);
  };

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Thay đổi mật khẩu
      </Typography>
      <Typography sx={{ textAlign: 'center', width: { xs: '80%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}>
        Cập nhật mật khẩu của bạn
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="password" label="Mật khẩu" type="password" />
        <RHFTextField name="confirmPassword" label="Xác nhận mật khẩu" type="password" />
        <LoadingButton type="submit" fullWidth loading={isSubmitting} sx={{ mt: 1 }}>
          Cập nhật
        </LoadingButton>
      </FormProvider>
    </Box>
  );
}

export default ChangePasswordForm;
