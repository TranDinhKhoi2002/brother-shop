import * as Yup from 'yup';
import FormProvider from '@/common/components/Form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import Button from '@/common/components/UI/Button';
import { Box, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchUserLogin } from '@/redux/slices/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { assignProductsToCart } from '@/redux/slices/cart';
import LoadingButton from '@/common/components/UI/LoadingButton';

function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

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

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values) => {
    const account = {
      username: values.username,
      password: values.password,
    };

    try {
      const { success, user } = await dispatch(fetchUserLogin(account)).unwrap();

      if (success) {
        toast.success('Đăng nhập thành công!!');
        router.replace('/');

        dispatch(assignProductsToCart({ cart: user.cart }));
      } else {
        toast.error('Tên đăng nhập hoặc mật khẩu không đúng');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
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
        <RHFTextField name="password" label="Mật khẩu" id="password" type="password" placeholder="Mật khẩu" />

        <Link href="/reset-password">
          <Typography sx={{ textDecorationLine: 'underline', fontStyle: 'italic', textAlign: 'center' }}>
            Quên mật khẩu?
          </Typography>
        </Link>
        <LoadingButton fullWidth loading={isSubmitting} type="submit" sx={{ mt: 3, mb: 1 }}>
          Đăng nhập
        </LoadingButton>
      </FormProvider>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
        <Typography sx={{ fontSize: '0.875rem', opacity: '0.7' }}>Chưa có tài khoản?</Typography>
        <Link href="/signup" style={{ fontWeight: 400 }}>
          Đăng ký
        </Link>
      </Stack>
    </Box>
  );
}

export default LoginForm;
