import * as Yup from 'yup';
import FormProvider from '@/common/components/Form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchSocialMediaUserLogin, fetchUserLogin } from '@/redux/slices/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { assignProductsToCart } from '@/redux/slices/cart';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { assignProductsToWishlist } from '@/redux/slices/wishlist';
import Image from 'next/image';
import { refreshToken } from '../services/refreshToken';
import { useGoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import config from '@/config';
import { appAssets } from '@/common/assets';

function LoginForm({ onLogin }) {
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

    const { success, user, message } = await dispatch(fetchUserLogin(account)).unwrap();

    if (success) {
      toast.success(message);

      if (onLogin) {
        onLogin();
      } else {
        router.replace('/');
      }

      dispatch(assignProductsToCart({ cart: user.cart }));
      dispatch(assignProductsToWishlist({ products: user.wishlist }));
    } else {
      toast.error(message);
    }
  };

  const handleLoginWithSocialMedia = async (name, email) => {
    try {
      const { success, user } = await dispatch(
        fetchSocialMediaUserLogin({
          name,
          email,
        }),
      ).unwrap();

      if (success) {
        dispatch(assignProductsToCart({ cart: user.cart }));
        dispatch(assignProductsToWishlist({ products: user.wishlist }));
        router.replace('/');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  const onSuccess = async (res) => {
    refreshToken(res);
    const googleProfile = res.profileObj;

    await handleLoginWithSocialMedia(googleProfile.name, googleProfile.email);
  };

  const onFailure = async (res) => {
    console.log('Login failed', res);
  };

  const { signIn } = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    onSuccess,
    onFailure,
    isSignedIn: true,
    accessType: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
  });

  const responseFacebook = async (userInfo) => {
    await handleLoginWithSocialMedia(userInfo.name, userInfo.email);
    router.replace(config.routes.home);
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
        <RHFTextField name="username" label="Email" id="username" placeholder="Tên đăng nhập" />
        <RHFTextField name="password" label="Mật khẩu" id="password" type="password" placeholder="Mật khẩu" />

        <Link href="/reset-password">
          <Typography sx={{ fontWeight: 400, textAlign: 'right' }}>Quên mật khẩu?</Typography>
        </Link>
        <LoadingButton fullWidth loading={isSubmitting} type="submit" sx={{ mt: 3, mb: 1 }}>
          Đăng nhập
        </LoadingButton>
      </FormProvider>

      <Divider sx={{ my: 3 }}>Hoặc</Divider>

      <Button
        variant="outlined"
        fullWidth
        sx={{ my: 1, height: '50px' }}
        startIcon={<Image src={appAssets.googleIcon} width={24} height={24} alt="" />}
        onClick={signIn}
      >
        Đăng nhập với Google
      </Button>

      <FacebookLogin
        appId={process.env.NEXT_PUBLIC_FACEBOOK_ID}
        size="small"
        textButton="Đăng nhập với Facebook"
        autoLoad={false}
        fields="name,email,picture"
        scope="public_profile,email,user_friends"
        callback={responseFacebook}
        typeButton="outlined"
        icon={
          <Image
            src={appAssets.facebookIcon}
            width={24}
            height={24}
            alt=""
            style={{ display: 'inline-block', marginRight: '8px' }}
          />
        }
        buttonStyle={{
          backgroundColor: 'transparent',
          color: 'black',
          textTransform: 'capitalize',
          width: '100%',
          fontSize: '0.875rem',
          height: '50px',
          borderRadius: '8px',
        }}
      />

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: '0.875rem', opacity: '0.7' }}>Chưa có tài khoản?</Typography>
        <Link href="/signup" style={{ fontWeight: 400 }}>
          Đăng ký
        </Link>
      </Stack>
    </Box>
  );
}

export default LoginForm;
