import * as Yup from 'yup';
import FormProvider from '@/common/components/Form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import Button from '@/common/components/UI/Button';
import { Box, Typography } from '@mui/material';

function LoginForm() {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Đăng nhập
      </Typography>
      <Typography
        sx={{ textAlign: 'center', width: { xs: '80%', md: '70%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}
      >
        Đăng nhập thành viên để nhận nhiều những chương trình ưu đãi hấp dẫn
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="username" label="Email/ Số điện thoại" id="username" placeholder="Tên đăng nhập" />
        <RHFTextField name="password" label="Mật khẩu" id="password" placeholder="Mật khẩu" />

        <Typography sx={{ textDecorationLine: 'underline', fontStyle: 'italic', textAlign: 'center' }}>
          Quên mật khẩu?
        </Typography>
        <Button className="w-full my-4">Đăng nhập</Button>
      </FormProvider>
    </Box>
  );
}

export default LoginForm;
