import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import {
  assignProductsToCart,
  fetchRemoveItemFromCart,
  fetchUpdateQuantity,
  removeFromCart,
  selectCartProducts,
  updateAmountOfProduct,
} from '@/redux/slices/cart';
import { selectIsAuthenticated } from '@/redux/slices/auth';
import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';
import { Image } from 'cloudinary-react';
import Title from '@/common/components/UI/Title';
import { toast } from 'react-toastify';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';

function DetailCart() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const products = useSelector(selectCartProducts);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  const childRefs = React.useMemo(() => products.map(() => React.createRef()), [products]);

  useEffect(() => {
    childRefs.forEach((ref, index) => {
      ref.current.value = products[index].quantity;
    });
  }, [childRefs, products]);

  let totalPrice = 0;

  const handleRemoveFromCart = async () => {
    if (!isAuthenticated) {
      dispatch(removeFromCart({ id: selectedItem.productId._id, size: selectedItem.size }));
      setModalIsVisible(false);
      setSelectedItem(null);
      return;
    }

    try {
      const { success, cart, message } = await dispatch(
        fetchRemoveItemFromCart({ productId: selectedItem.productId._id, size: selectedItem.size }),
      ).unwrap();

      if (success) {
        toast.success(message);
        dispatch(assignProductsToCart({ cart }));

        setModalIsVisible(false);
        setSelectedItem(null);
      } else {
        toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
  };

  const handleConfirmRemove = (cartProduct) => {
    setModalIsVisible(true);
    setSelectedItem(cartProduct);
  };

  const handleUpdateAmount = async (id, size, refIndex) => {
    if (!isAuthenticated) {
      dispatch(
        updateAmountOfProduct({
          id,
          size,
          quantity: +childRefs[refIndex].current.value,
        }),
      );
      return;
    }

    try {
      const { cart, success, message } = await dispatch(
        fetchUpdateQuantity({ productId: id, size, quantity: +childRefs[refIndex].current.value }),
      ).unwrap();

      if (success) {
        dispatch(assignProductsToCart({ cart }));
        toast.success(message);
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại!!');
    }
    return;
  };

  const tdClass = 'p-3 align-top border-t-[1px] border-solid border-[#dee2e6]';

  return (
    <div>
      <Title>ĐƠN HÀNG CỦA BẠN</Title>
      <table className="w-full text-[#111] mt-2">
        <tbody>
          {products.map((cartProduct, index) => {
            totalPrice += cartProduct.productId.price * cartProduct.quantity;

            return (
              <Fragment key={index}>
                <tr>
                  <td rowSpan={2} className={`w-[100px] ${tdClass}`}>
                    <Image
                      cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                      publicId={cartProduct.productId.images.mainImg}
                      alt=""
                      style={{ width: '100px' }}
                    />
                    <button
                      onClick={handleConfirmRemove.bind(this, cartProduct)}
                      className="flex items-center font-light hover:text-[#0056b3] transition-all duration-300 ease-linear"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr w-3 h-3" />
                      &nbsp;<span>Xóa</span>
                    </button>
                  </td>
                  <td className={`${tdClass} py-3`}>
                    <p className="text-sm text-[#444] mb-1 hover:text-[#0056b3] transition duration-300">
                      <Link href={`/shop/products/${cartProduct.productId._id}`} className="font-medium">
                        {cartProduct.productId.name}
                      </Link>
                    </p>
                    <p>
                      {cartProduct.size} / {printNumberWithCommas(cartProduct.productId.price)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>
                    <div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();

                          handleUpdateAmount(cartProduct.productId._id, cartProduct.size, index);
                        }}
                        className="flex"
                      >
                        <input
                          type="number"
                          required
                          min={1}
                          ref={childRefs[index]}
                          className="w-[100px] lg:w-auto py-[0.5rem] px-3 text-base font-normal text-[#495057] border-[1px] border-solid border-[#ced4da] flex-1 rounded outline-none focus:border-[#ee4266] transition duration-150"
                        />
                        <button className="py-1 px-2 ml-2 text-[13px] leading-6 rounded-[0.2rem] text-[#343a40] border-[1px] border-solid border-[#343a40] hover:text-white hover:bg-[#343a40] hover:border-[#343a40] transition-all duration-300 ease-linear">
                          CẬP NHẬT
                        </button>
                      </form>{' '}
                      =
                      <b>
                        {' '}
                        {printNumberWithCommas((+cartProduct.quantity * cartProduct.productId.price).toString())} đ
                      </b>
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
          <tr>
            <td className={`${tdClass} text-right`}>Tổng: </td>
            <td className={`${tdClass}`}>
              <div>
                <b className="text-lg">{printNumberWithCommas(totalPrice.toString())} đ</b>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <ConfirmModal
        isOpen={modalIsVisible}
        title="Xóa sản phẩm?"
        subTitle="Bạn có chắc muốn xóa sản phẩm chứ?"
        confirmTextBtn="Xóa"
        onClose={() => setModalIsVisible(false)}
        onConfirm={handleRemoveFromCart}
      />
    </div>
  );
}

export default DetailCart;
