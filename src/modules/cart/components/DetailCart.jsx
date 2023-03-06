import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { removeFromCart, updateAmountOfProduct } from '@/redux/slices/cart';
import { printNumberWithCommas } from '@/common/utility/printPriceWithComma';
import { Image } from 'cloudinary-react';
import Title from '@/common/components/UI/Title';

function DetailCart() {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const childRefs = React.useMemo(() => products.map(() => React.createRef()), [products]);

  useEffect(() => {
    childRefs.forEach((ref, index) => {
      ref.current.value = products[index].amount;
    });
  }, [childRefs, products]);

  let totalPrice = 0;

  const removeFromCartHandler = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const updateAmountHandler = (id, size, refIndex) => {
    dispatch(
      updateAmountOfProduct({
        id,
        size,
        amount: childRefs[refIndex].current.value,
      }),
    );
  };

  return (
    <div>
      <Title>ĐƠN HÀNG CỦA BẠN</Title>
      <table className="w-full text-[#111] mt-2">
        <tbody>
          {products.map((cartProduct, index) => {
            totalPrice += cartProduct.product.price * cartProduct.amount;

            return (
              <Fragment key={index}>
                <tr>
                  <td rowSpan={2} className="w-[100px]">
                    <Image
                      cloudName="ddajkcbs2"
                      publicId={cartProduct.product.images.mainImg}
                      alt=""
                      style={{ width: '100px' }}
                    />
                    <button
                      onClick={() => removeFromCartHandler(cartProduct.product._id, cartProduct.size)}
                      className="flex items-center font-light hover:text-[#0056b3]"
                    >
                      <FontAwesomeIcon icon={faTrash} className="mr w-3 h-3" />
                      &nbsp;<span>Xóa</span>
                    </button>
                  </td>
                  <td className="py-3">
                    <p className="text-sm text-[#444] mb-1 hover:text-[#0056b3] transition duration-300">
                      <Link href={`/shop/products/${cartProduct.product._id}`} className="font-medium">
                        {cartProduct.product.name}
                      </Link>
                    </p>
                    <p>
                      {cartProduct.size} / {printNumberWithCommas(cartProduct.product.price)}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();

                          updateAmountHandler(cartProduct.product._id, cartProduct.size, index);
                        }}
                        className="flex"
                      >
                        <input
                          type="number"
                          required
                          min={0}
                          ref={childRefs[index]}
                          className="py-[0.5rem] px-3 text-base font-normal text-[#495057] border-[1px] border-solid border-[#ced4da] flex-1 rounded outline-none focus:border-[#ee4266] transition duration-150"
                        />
                        <button className="py-1 px-2 ml-2 text-[13px] leading-6 rounded-[0.2rem] text-[#343a40] border-[1px] border-solid border-[#343a40] hover:text-white hover:bg-[#343a40] hover:border-[#343a40]">
                          UPDATE
                        </button>
                      </form>{' '}
                      = <span>đ </span>
                      <b>{printNumberWithCommas((+cartProduct.amount * cartProduct.product.price).toString())}</b>
                    </div>
                  </td>
                </tr>
              </Fragment>
            );
          })}
          <tr>
            <td className="text-right">Tổng: </td>
            <td>
              <div>
                <span>đ </span>
                <b>{printNumberWithCommas(totalPrice.toString())}</b>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default DetailCart;
