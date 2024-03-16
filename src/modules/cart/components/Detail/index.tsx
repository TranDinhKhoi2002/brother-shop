import React, { Fragment, ReactElement, RefObject, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { selectCartProducts } from '@/redux/slices/cart';
import { printNumberWithCommas } from '@/utils/common';
import Title from '@/common/components/UI/Title';
import ConfirmModal from '@/common/components/Modal/ConfirmModal';
import { Product } from '@/types/product';
import { CartItem } from '@/types/customer';
import { useAppSelector } from '@/hooks/useAppSelector';
import { cld } from '@/utils/lib/cloudinary';
import useCart from '@/hooks/useCart';

function DetailCart(): ReactElement {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>();
  const products = useAppSelector<CartItem[]>(selectCartProducts);
  const { handleRemoveOneFromCart, handleUpdateQuantity } = useCart();

  const childRefs: RefObject<any>[] = React.useMemo(() => products.map(() => React.createRef()), [products]);
  const selectedProductItem = selectedItem?.productId as Product;

  useEffect(() => {
    childRefs.forEach((ref, index) => {
      ref.current.value = products[index].quantity;
    });
  }, [childRefs, products]);

  let totalPrice = 0;

  const handleRemoveFromCart = async () => {
    const callback = () => {
      setModalIsVisible(false);
      setSelectedItem(null);
    };
    handleRemoveOneFromCart(selectedProductItem._id, selectedItem!.size, callback);
  };

  const handleConfirmRemove = (cartProduct: CartItem) => {
    setModalIsVisible(true);
    setSelectedItem(cartProduct);
  };

  const handleUpdateAmount = async (id: string, size: string, refIndex: number) => {
    handleUpdateQuantity(id, size, +childRefs[refIndex].current.value);
  };

  const getProductImg = (product: Product) => {
    return cld.image(product.images.mainImg);
  };

  const tdClass = 'p-3 align-top border-t-[1px] border-solid border-[#dee2e6]';

  return (
    <div>
      <Title>ĐƠN HÀNG CỦA BẠN</Title>
      <table className="w-full text-[#111] mt-2">
        <tbody>
          {products.map((cartProduct, index) => {
            const product = cartProduct.productId as Product;
            totalPrice += product.price * cartProduct.quantity;

            return (
              <Fragment key={index}>
                <tr>
                  <td rowSpan={2} className={`w-[100px] ${tdClass}`}>
                    <AdvancedImage
                      cldImg={getProductImg(product)}
                      plugins={[lazyload(), responsive(), placeholder()]}
                      style={{ width: '100px' }}
                      alt={product.name}
                    />
                    <button
                      onClick={() => handleConfirmRemove(cartProduct)}
                      className="flex items-center font-light hover:text-[#0056b3] transition-all duration-300 ease-linear"
                    >
                      <DeleteIcon className="mr w-3 h-3" />
                      &nbsp;<span>Xóa</span>
                    </button>
                  </td>
                  <td className={`${tdClass} py-3`}>
                    <p className="text-sm text-[#444] mb-1 hover:text-[#0056b3] transition duration-300">
                      <Link href={`/shop/products/${product._id}`} className="font-medium">
                        {product.name}
                      </Link>
                    </p>
                    <p>
                      {cartProduct.size} / {printNumberWithCommas(product.price)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td className={tdClass}>
                    <div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();

                          handleUpdateAmount(product._id, cartProduct.size, index);
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
                      =<b> {printNumberWithCommas(+cartProduct.quantity * product.price)} đ</b>
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
                <b className="text-lg">{printNumberWithCommas(totalPrice)} đ</b>
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
