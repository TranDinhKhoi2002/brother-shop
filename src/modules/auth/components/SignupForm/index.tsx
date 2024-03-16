import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { Dayjs } from 'dayjs';
import FormProvider from '@/common/components/Form/FormProvider';
import RHFTextField from '@/common/components/Form/RHFTextField';
import RHFDatePicker from '@/common/components/Form/RHFDatePicker';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { fetchUserSignup } from '@/redux/slices/auth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { SignupPayload } from '@/services/types/auth';
import { GENDER } from '@/utils/constants';
import config from '@/config';
import { SignupSchema, defaultValues } from './validation';

function SignupForm() {
  const [gender, setGender] = useState(GENDER.male);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { mutate: signupMutation } = useMutation({
    mutationFn: (account: SignupPayload) => dispatch(fetchUserSignup(account)).unwrap(),
    onSuccess: (data) => {
      const { message } = data;
      toast.success(message);
      router.replace(config.routes.home);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const methods = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
    birthday: Dayjs;
  }) => {
    const account = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phone: values.phone,
      address: values.address,
      gender: gender,
      birthday: new Date(values.birthday.toDate()).toISOString(),
    };
    signupMutation(account);
  };

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', fontWeight: 500, fontSize: '1.25rem', my: '12px' }} variant="h5">
        Đăng ký
      </Typography>
      <Typography
        sx={{ textAlign: 'center', width: { xs: '80%', md: '70%' }, mx: 'auto', fontWeight: 400, mb: '20px' }}
      >
        Đăng ký trở thành thành viên của Brother Shop
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ và tên" />
        <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" />
        <RHFTextField name="password" type="password" label="Mật khẩu" id="password" placeholder="Mật khẩu" />
        <RHFTextField
          name="confirmPassword"
          type="password"
          label="Xác nhận mật khẩu"
          id="confirmPassword"
          placeholder="Nhập lại mật khẩu"
        />
        <RHFTextField name="phone" label="Số điện thoại" id="phone" placeholder="Số điện thoại" />
        <RHFTextField name="address" label="Địa chỉ" id="address" placeholder="Địa chỉ" />

        <FormControl sx={{ mb: 2 }}>
          <FormLabel>
            <label className="inline-block mb-2">
              Giới tính <span className="text-primary">*</span>
            </label>
          </FormLabel>
          <RadioGroup row defaultValue={GENDER.male} value={gender} onChange={(e) => setGender(e.target.value)}>
            <FormControlLabel value={GENDER.male} control={<Radio />} label={GENDER.male} />
            <FormControlLabel value={GENDER.female} control={<Radio />} label={GENDER.female} />
            <FormControlLabel value={GENDER.other} control={<Radio />} label={GENDER.other} />
          </RadioGroup>
        </FormControl>

        <Box>
          <RHFDatePicker name="birthday" label="Ngày sinh" sx={{ width: '100%', fontWeight: 400 }} />
        </Box>

        <LoadingButton fullWidth loading={isSubmitting} type="submit" sx={{ mt: 3, mb: 1 }}>
          Đăng ký
        </LoadingButton>
      </FormProvider>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
        <Typography sx={{ fontSize: '0.875rem', opacity: '0.7' }}>Đã có tài khoản?</Typography>
        <Link href={config.routes.login} style={{ fontWeight: 400 }}>
          Đăng nhập
        </Link>
      </Stack>
    </Box>
  );
}

export default SignupForm;
