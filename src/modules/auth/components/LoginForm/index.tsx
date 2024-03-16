import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GoogleLoginResponse, GoogleLoginResponseOffline, useGoogleLogin } from 'react-google-login';
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { fetchSocialMediaUserLogin, fetchUserLogin } from '@/redux/slices/auth';
import { assignPromotions } from '@/redux/slices/promotions';
import { assignProductsToCart } from '@/redux/slices/cart';
import { assignProductsToWishlist } from '@/redux/slices/wishlist';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { refreshToken } from '@/utils/auth';
import config from '@/config';
import { LoginPayload, LoginWithSocialMediaAccountPayload } from '@/services/types/auth';
import { appAssets } from '@/common/assets';
import { LoginSchema, defaultValues } from './validation';

type LoginFormProps = {
  onLogin?: () => void;
};

function LoginForm({ onLogin }: LoginFormProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (account: LoginPayload) => dispatch(fetchUserLogin(account)).unwrap(),
    onSuccess: (data) => {
      const { message, user } = data;
      toast.success(message);

      if (onLogin) {
        onLogin();
      } else {
        router.replace('/');
      }

      dispatch(assignProductsToCart({ cart: user.cart }));
      dispatch(assignProductsToWishlist({ products: user.wishlist }));
      dispatch(assignPromotions({ promotions: user.promotions }));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: loginWithSocialMedia } = useMutation({
    mutationFn: (data: LoginWithSocialMediaAccountPayload) => dispatch(fetchSocialMediaUserLogin(data)).unwrap(),
    onSuccess: (data) => {
      const { user } = data;
      dispatch(assignProductsToCart({ cart: user.cart }));
      dispatch(assignProductsToWishlist({ products: user.wishlist }));
      dispatch(assignPromotions({ promotions: user.promotions }));

      if (onLogin) {
        onLogin();
      } else {
        router.replace(config.routes.home);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: { username: string; password: string }) => {
    const account = {
      username: values.username,
      password: values.password,
    };
    login(account);
  };

  const handleLoginWithSocialMedia = (name: string, email: string) => {
    loginWithSocialMedia({ name, email });
  };

  const onLoginGoogleSuccess = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    refreshToken(res);
    const googleProfile = (res as GoogleLoginResponse).profileObj;
    handleLoginWithSocialMedia(googleProfile.name, googleProfile.email);
  };

  const onLoginGoogleFailure = () => {
    toast.error('Login failed');
  };

  const { signIn } = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    onSuccess: onLoginGoogleSuccess,
    onFailure: onLoginGoogleFailure,
    accessType: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile',
  });

  const responseFacebook = (
    userInfo: (ReactFacebookLoginInfo | ReactFacebookFailureResponse) & { name: string; email: string },
  ) => {
    handleLoginWithSocialMedia(userInfo.name, userInfo.email);
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
        <LoadingButton type="submit" fullWidth loading={isPending} sx={{ mt: 3, mb: 1 }}>
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
        appId={process.env.NEXT_PUBLIC_FACEBOOK_ID as string}
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
