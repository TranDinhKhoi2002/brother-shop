import BuySteppers from '@/common/components/UI/BuySteppers';
import classes from './Cart.module.css';
import DetailCart from './DetailCart';
import OrderForm from './OrderForm';

function CartInfor() {
  return (
    <>
      <BuySteppers activeStep={2} />
      <div className={`${classes.cart} md:grid grid-cols-2 gap-5 px-[5%] xl:px-0 mt-5 mb-10`}>
        <DetailCart />
        <OrderForm />
      </div>
    </>
  );
}

export default CartInfor;
