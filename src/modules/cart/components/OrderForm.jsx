import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Router from 'next/router';
import FormProvider from '@/common/components/Form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import Link from 'next/link';
import Title from '@/common/components/UI/Title';
import { Box, Button as ButtonMUI, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Button from '@/common/components/UI/Button';
import { selectCurrentUser } from '@/redux/slices/auth';
import config from '@/config';
import { useTheme } from '@mui/styles';

function OrderForm() {
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleChange = (event) => {
    setSelectedAddress(event.target.value);
    setValue('address', event.target.value);
  };

  const currentUser = useSelector(selectCurrentUser);

  const theme = useTheme();

  const OrderSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập họ tên'),
    phone: Yup.string().required('Vui lòng nhập số điện thoại'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    address: Yup.string().required('Vui lòng nhập địa chỉ nhận hàng'),
    note: Yup.string(),
  });

  const defaultValues = {
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
  };

  const methods = useForm({
    resolver: yupResolver(OrderSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
    reset,
  } = methods;

  useEffect(() => {
    reset({
      name: currentUser?.name,
      phone: currentUser?.phone,
      email: currentUser?.email,
      note: '',
    });

    setSelectedAddress(currentUser?.address[0]?.detail);
  }, [currentUser, reset]);

  const onSubmit = (values) => {
    const { name, phone, email, address, note } = values;

    const shippingInfor = { ...values };
    localStorage.setItem('shippingInfor', JSON.stringify(shippingInfor));

    Router.push({
      pathname: config.routes.checkoutPayment,
      query: {
        toName: name,
        toPhone: phone,
        toEmail: email,
        toAddress: address,
        toNote: note,
      },
    });
  };

  return (
    <Box>
      <Title>THÔNG TIN ĐẶT HÀNG</Title>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ tên người nhận" />
        <RHFTextField name="phone" label="Điện thoại liên lạc" id="name" placeholder="Số điện thoại" />
        <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" />

        <Box sx={{ mt: 4, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Địa chỉ</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedAddress}
              label="Địa chỉ"
              name="address"
              onChange={handleChange}
            >
              {currentUser?.address.map((item, index) => (
                <MenuItem key={index} value={item.detail}>
                  {item.detail}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <RHFTextField name="note" label="Ghi chú" id="note" placeholder="Ghi chú" tag="textarea" isRequired={false} />

        <Button type="submit" disabled={isSubmitting} fullWidth>
          THANH TOÁN
        </Button>
        <Divider sx={{ backgroundColor: theme.palette.grey[900], my: 2 }} />
        <Link href={config.routes.home}>
          <ButtonMUI fullWidth variant="outlined" sx={{ py: '12px' }}>
            CẦN SẢN PHẨM KHÁC? TIẾP TỤC MUA HÀNG
          </ButtonMUI>
        </Link>
      </FormProvider>
    </Box>
  );
}

export default OrderForm;
