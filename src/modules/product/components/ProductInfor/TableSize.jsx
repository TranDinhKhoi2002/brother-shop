import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function TableSize({ product, onAddToCart }) {
  const sizes = product.sizes.map((size) => ({ name: size.name, remainingQuantity: size.quantity - size.sold }));

  const chooseSizeHandler = (size) => {
    onAddToCart(size);
    toast.success('Đã thêm vào giỏ hàng');
  };

  return (
    <table className="w-full mb-4 text-[#212529] mt-6">
      <tbody>
        {sizes.map((size) => (
          <tr key={size.name} className="border-y-[1px] border-[#dad1d1] h-[35px]">
            <td>Size {size.name}</td>
            <td className="text-right ">
              Còn <strong>{size.remainingQuantity}</strong> sản phẩm
            </td>
            <td className="text-right">
              <button className="text-[#ff0000] font-light" onClick={chooseSizeHandler.bind(this, size.name)}>
                <FontAwesomeIcon icon={faPlusCircle} className="mr-1" />
                Chọn mua
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableSize;
