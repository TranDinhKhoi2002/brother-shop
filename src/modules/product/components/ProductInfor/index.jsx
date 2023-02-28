import { addToCart } from '@/redux/slices/cart';
import { useDispatch } from 'react-redux';

import GeneralInfor from './Generalnfor';
import GuidanceSize from './GuidanceSize';
import PreviewImages from './PreviewImages';
import TableSize from './TableSize';

function ProductInfor({ product }) {
  const dispatch = useDispatch();

  const addToCartHandler = (size) => {
    dispatch(addToCart({ product, size }));
  };

  return (
    <div className="md:grid grid-cols-3 gap-6 mt-3">
      <div className="xsm:min-h-[510px]">
        <PreviewImages images={product.images} />
      </div>
      <div className="col-span-2 px-4">
        <div className="md:grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <GeneralInfor
              name={product.name}
              id={product._id.slice(0, 8).toUpperCase()}
              price={product.price}
              oldPrice={product.oldPrice}
            />
            <TableSize onAddToCart={addToCartHandler} product={product} />
            <GuidanceSize />
          </div>
          <div className="mb-4">
            <h5 className="text-2xl font-light my-3">Mô tả sản phẩm</h5>
            <p>{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfor;
