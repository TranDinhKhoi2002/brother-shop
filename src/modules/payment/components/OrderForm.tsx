import { ReactElement } from 'react';
import Router from 'next/router';
import Title from '@/common/components/UI/Title';
import { Box, Divider } from '@mui/material';
import config from '@/config';
import AddressList from './AddressList';
import AddressForm from '@/modules/customer/components/AddressForm';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { add } from '@/redux/slices/breadcrumb';

function OrderForm(): ReactElement {
  const isAuthenticated = useAuth();
  const dispatch = useAppDispatch();

  const handleSubmitForm = (values: {
    name: string;
    email: string;
    phone: string;
    address: string;
    cities: string;
    districts: string;
    wards: string;
  }) => {
    const { name, email, phone, address, cities, districts, wards } = values;

    const shippingInfor = {
      name,
      phone,
      email: email,
      address: `${address}, ${wards}, ${districts}, ${cities}`,
      note: '',
    };
    localStorage.setItem('shippingInfor', JSON.stringify(shippingInfor));

    Router.push({
      pathname: config.routes.checkoutPayment,
      query: {
        toName: name,
        toPhone: phone,
        toEmail: shippingInfor.email,
        toAddress: shippingInfor.address,
        toNote: shippingInfor.note,
      },
    });
    dispatch(add({ item: { id: 'checkout/payment', url: config.routes.checkoutPayment, name: 'Thanh toán' } }));
  };

  return (
    <Box>
      <Title>THÔNG TIN ĐẶT HÀNG</Title>
      {isAuthenticated && (
        <>
          <AddressList />
          <Divider sx={{ my: 3, fontWeight: 400 }}>Hoặc</Divider>
        </>
      )}
      <AddressForm onSubmitForm={handleSubmitForm} />
    </Box>
  );
}

export default OrderForm;
