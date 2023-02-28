import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import classes from './Cart.module.css';
import Router, { useRouter } from 'next/router';
import { checkOut } from '@/redux/slices/cart';
import FormProvider from '@/common/components/Form/FormProvider';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFTextField from '@/common/components/Form/RHFTextField';
import DeliveryMethods from './DeliveryMethods';
import BranchList from './BranchList';
import Link from 'next/link';
import Title from '@/common/components/UI/Title';

function OrderForm() {
  const [codShip, setCodShip] = useState(true);

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
  } = methods;

  const onSubmit = (values) => {
    const { name, phone, email, address, note } = values;

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

  const changeDeliveryMethodsHandler = () => {
    setCodShip((prevState) => !prevState);
    setValue('address', '');
  };

  const changeAddressHandler = (address) => {
    setValue('address', address);
  };

  return (
    <div className={classes.delivery}>
      <Title>THÔNG TIN ĐẶT HÀNG</Title>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField name="name" label="Họ tên" id="name" placeholder="Họ tên người nhận" />
        <RHFTextField name="phone" label="Điện thoại liên lạc" id="name" placeholder="Số điện thoại" />
        <RHFTextField name="email" label="Email" id="email" placeholder="Địa chỉ email" />

        <DeliveryMethods onChange={changeDeliveryMethodsHandler} codShip={codShip} />

        {codShip ? (
          <RHFTextField name="address" label="Địa chỉ" id="name" placeholder="Địa chỉ nhận hàng" />
        ) : (
          <>
            <BranchList onChange={changeAddressHandler} />
            {getValues('address') === '' && <span className="text-primary">Vui lòng chọn cửa hàng</span>}
          </>
        )}

        <RHFTextField name="note" label="Ghi chú" id="note" placeholder="Ghi chú" tag="textarea" isRequired={false} />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer h-[43px] text-[13px] text-white mt-5 bg-[#17a2b8] border-[#17a2b8] rounded hover:bg-[#138496] hover:border-[#117a8b]"
        >
          THANH TOÁN
        </button>
        <hr className="my-4" />
        <Link href={'/'}>
          <button className="w-full cursor-pointer h-[43px] text-[13px] text-[#212529] bg-[#ffc107] border-[#ffc107] rounded hover:bg-[#e0a800] hover:border-[#d39e00]">
            CẦN SẢN PHẨM KHÁC? TIẾP TỤC MUA HÀNG
          </button>
        </Link>
      </FormProvider>
    </div>
  );
}

export default OrderForm;
