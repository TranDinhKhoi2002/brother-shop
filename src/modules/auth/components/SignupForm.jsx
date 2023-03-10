import * as Yup from 'yup';
import FormProvider from '@/common/components/Form/FormProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import Button from '@/common/components/UI/Button';
import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchUserSignup } from '@/redux/slices/auth';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Link from 'next/link';
import RHFDatePicker from '@/common/components/Form/RHFDatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';

function SignupForm() {
  const [gender, setGender] = useState('Nam');

  const dispatch = useDispatch();
  const router = useRouter();

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
    password: Yup.string().required('Vui lòng nhập mật khẩu').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: Yup.string()
      .required('Vui lòng xác nhận mật khẩu')
      .test('equal', 'Xác nhận mật khẩu không chính xác', function (confirmPassword) {
        const { password } = this.parent;
        return password === confirmPassword;
      }),
    phone: Yup.string()
      .required('Vui lòng nhập số điện thoại')
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/, 'Số điện thoại không hợp lệ'),
    address: Yup.string().required('Vui lòng nhập địa chỉ'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    birthday: dayjs('1990-01-01'),
  };

  const methods = useForm({
    resolver: yupResolver(SignupSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values) => {
    console.log(values);
    const account = {
      name: values.name,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phone: values.phone,
      address: values.address,
      gender: gender,
      birthday: new Date(values.birthday).toISOString(),
    };

    try {
      const { success, message } = await dispatch(fetchUserSignup(account)).unwrap();

      if (success) {
        toast.success('Đăng nhập thành công!!');
        router.replace('/');
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
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
          <RHFDatePicker name="birthday" label="Ngày sinh" sx={{ width: '100%' }} />
        </Box>

        <Button className="w-full my-4" type="submit">
          Đăng nhập
        </Button>
      </FormProvider>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={1}>
        <Typography sx={{ fontSize: '0.875rem', opacity: '0.7' }}>Đã có tài khoản?</Typography>
        <Link href="/login" style={{ fontWeight: 400 }}>
          Đăng nhập
        </Link>
      </Stack>
    </Box>
  );
}

export default SignupForm;
