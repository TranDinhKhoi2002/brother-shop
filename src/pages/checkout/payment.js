import BuySteppers from '@/common/components/UI/BuySteppers';
import { Container, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartProducts } from '@/redux/slices/cart';
import { selectCurrentUser } from '@/redux/slices/auth';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CheckoutMethods from '@/modules/payment/components/CheckoutMethods';
import PreviewOrder from '@/modules/payment/components/PreviewOrder';
import CompanyBill from '@/modules/payment/components/CompanyBill';
import PageContainer from '@/common/components/Layout/PageContainer';
import BackdropLoading from '@/common/components/Loading/BackdropLoading';
import { TRANSPORTATION_COST, paymentMethods } from '@/constants';
import PromotionRadioBtnForm from '@/modules/promotion/components/PromotionRadioBtnForm';
import { fetchUpdatePromotionQuantity } from '@/redux/slices/promotions';

function CheckoutPayment() {
  const [loaded, setLoaded] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [selectedPromotion, setSelectedPromotion] = useState();

  const cartProducts = useSelector(selectCartProducts);
  const currentUser = useSelector(selectCurrentUser);

  const router = useRouter();
  const dispatch = useDispatch();
  const ref = useRef();

  const { toName, toPhone, toAddress, toNote, toEmail } = router.query;

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <BackdropLoading isVisible={!loaded} />;
  }

  const totalProductsPrice = cartProducts.reduce((acc, currentItem) => {
    return acc + currentItem.productId.price * currentItem.quantity;
  }, 0);

  const totalPrice = totalProductsPrice + TRANSPORTATION_COST;

  const payHandler = async (totalPrice) => {
    const { companyName, companyAddress, companyTaxNumber } = ref.current.getInvoiceCompany();

    const formatedCartProducts = cartProducts.map((cartProduct) => ({
      product: cartProduct.productId._id,
      name: cartProduct.productId.name,
      price: cartProduct.productId.price,
      amount: cartProduct.quantity,
      size: cartProduct.size,
      image: `${process.env.NEXT_PUBLIC_CLOUDINARY_PREFIX_PATH}/${cartProduct.productId.images.mainImg}`,
    }));

    const shippingInfor = JSON.parse(localStorage.getItem('shippingInfor'));

    const order = {
      toName: toName || shippingInfor.name,
      toPhone: toPhone || shippingInfor.phone,
      toEmail: toEmail || shippingInfor.email,
      toAddress: toAddress || shippingInfor.address,
      toNote: toNote || shippingInfor.note,
      products: formatedCartProducts,
      totalProductsPrice,
      shippingPrice: TRANSPORTATION_COST,
      totalPrice,
      companyName,
      companyAddress,
      companyTaxNumber,
      paymentMethod: paymentMethod === 'cod' ? paymentMethods.COD : paymentMethods.VNPAY,
      customerId: currentUser?._id,
    };
    localStorage.setItem('order', JSON.stringify(order));

    if (selectedPromotion) {
      const parsedSelectedPromotion = JSON.parse(selectedPromotion);
      dispatch(fetchUpdatePromotionQuantity(parsedSelectedPromotion._id));
    }

    if (paymentMethod === 'cod') {
      toast.success('Đặt hàng thành công');
      router.replace(
        {
          pathname: '/checkout/success',
          query: {
            name: toName || shippingInfor.name,
            email: toEmail || shippingInfor.email,
            method: 'cod',
          },
        },
        '/checkout/success',
      );
      return;
    }

    router.replace(`${process.env.NEXT_PUBLIC_DB_BASE_URL}/payments/vnpay?totalPrice=${totalPrice}`);
  };

  const changePaymentMethodHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  const changePromotionHandler = (e) => {
    setSelectedPromotion(e.target.value);
  };

  return (
    <PageContainer barTitle="Đặt hàng" headTitle="Đặt Hàng">
      <BuySteppers activeStep={2} />
      <Container maxWidth="xxl">
        <Grid container spacing={3} className="mt-5 mb-10">
          <Grid item xs={12}>
            <PromotionRadioBtnForm selectedPromotion={selectedPromotion} onChangePromotion={changePromotionHandler} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CheckoutMethods method={paymentMethod} onChangeMethod={changePaymentMethodHandler} />
            <CompanyBill ref={ref} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <PreviewOrder
              cartProducts={cartProducts}
              totalPrice={totalPrice}
              shippingPrice={TRANSPORTATION_COST}
              selectedPromotion={selectedPromotion}
              onPay={payHandler}
            />
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}

export default CheckoutPayment;
