import * as Yup from 'yup';
import FormProvider from '@/common/components/Form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { fetchUserSignup } from '@/redux/slices/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import RHFDatePicker from '@/common/components/Form/RHFDatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ReactElement, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import LoadingButton from '@/common/components/Buttons/LoadingButton';
import { checkValidVietNamPhoneNumber } from '@/utils/common';
import config from '@/config';

function SignupForm(): ReactElement {
  const [gender, setGender] = useState('Nam');

  const dispatch = useAppDispatch();
  const router = useRouter();

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    password: Yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
    confirmPassword: Yup.string()
      .required('Vui lòng xác nhận mật khẩu')
      .test('equal', 'Xác nhận mật khẩu không chính xác', function (confirmPassword) {
        const { password } = this.parent;
        return password === confirmPassword;
      }),
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .test('viet_nam_phone_number', 'Số điện thoại không hợp lệ', function (phoneNumber) {
        if (phoneNumber !== undefined) {
          return checkValidVietNamPhoneNumber(phoneNumber);
        }
        return false;
      }),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    birthday: dayjs(Date.now()),
  };

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

    const { success, message } = await dispatch(fetchUserSignup(account)).unwrap();

    if (success) {
      toast.success(message);
      router.replace('/');
    } else {
      toast.error(message);
    }
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
          <RadioGroup row defaultValue="Nam" value={gender} onChange={(e) => setGender(e.target.value)}>
            <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
            <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
            <FormControlLabel value="Khác" control={<Radio />} label="Khác" />
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
