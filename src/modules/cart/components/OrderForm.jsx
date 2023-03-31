import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Router from 'next/router';
import FormProvider from '@/common/components/Form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import DeliveryMethods from './DeliveryMethods';
import BranchList from './BranchList';
import Link from 'next/link';
import Title from '@/common/components/UI/Title';
import { Box, Button as ButtonMUI, Divider } from '@mui/material';
import Button from '@/common/components/UI/Button';
import { selectCurrentUser } from '@/redux/slices/auth';

function OrderForm() {
  const [deliveryMethod, setDeliveryMethod] = useState('cod');

  const currentUser = useSelector(selectCurrentUser);

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
    formState: { isSubmitting },
    setValue,
    getValues,
    reset,
  } = methods;

  useEffect(() => {
    reset({
      name: currentUser?.name,
      phone: currentUser?.phone,
      email: currentUser?.email,
      address: currentUser?.address,
      note: '',
    });
  }, [currentUser, reset]);

  const onSubmit = (values) => {
    const { name, phone, email, address, note } = values;

    const shippingInfor = { ...values };
    localStorage.setItem('shippingInfor', JSON.stringify(shippingInfor));

    Router.push({
      pathname: '/checkout/payment',
      query: {
        toName: name,
        toPhone: phone,
        toEmail: email,
        toAddress: address,
        toNote: note,
      },
    });
  };

  const changeDeliveryMethodsHandler = (method) => {
    setDeliveryMethod(method);
    setValue('address', '');
  };

  const changeAddressHandler = (address) => {
    setValue('address', address);
  };

  return (
    <Box>
      <Title>THÔNG TIN ĐẶT HÀNG</Title>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ tên người nhận" />
        <RHFTextField name="phone" label="Điện thoại liên lạc" id="name" placeholder="Số điện thoại" />
        <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" />

        <DeliveryMethods onChange={changeDeliveryMethodsHandler} method={deliveryMethod} />

        {deliveryMethod === 'cod' ? (
          <RHFTextField name="address" label="Địa chỉ" id="name" placeholder="Địa chỉ nhận hàng" />
        ) : (
          <>
            <BranchList onChange={changeAddressHandler} />
            {getValues('address') === '' && <span className="text-primary">Vui lòng chọn cửa hàng</span>}
          </>
        )}

        <RHFTextField name="note" label="Ghi chú" id="note" placeholder="Ghi chú" tag="textarea" isRequired={false} />

        <Button type="submit" disabled={isSubmitting} fullWidth>
          THANH TOÁN
        </Button>
        <Divider sx={{ backgroundColor: '#111', my: 2 }} />
        <Link href={'/'}>
          <ButtonMUI fullWidth variant="outlined" sx={{ py: '12px' }}>
            CẦN SẢN PHẨM KHÁC? TIẾP TỤC MUA HÀNG
          </ButtonMUI>
        </Link>
      </FormProvider>
    </Box>
  );
}

export default OrderForm;
