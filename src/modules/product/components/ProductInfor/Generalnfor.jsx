import { printNumberWithCommas } from '@/utils/printPriceWithComma';

function GeneralInfor(props) {
  return (
    <div className="my-3">
      <h4 className="text-2xl text-black">{props.name}</h4>
      <p className="text-black my-2">Mã số: {props.id}</p>
      {props.oldPrice ? (
        <div className="flex items-center">
          <h5 className="text-lg font-normal mr-3 line-through">{printNumberWithCommas(props.oldPrice)}</h5>
          <h5 className="text-primary text-lg font-normal">{printNumberWithCommas(props.price)} đ</h5>
        </div>
      ) : (
        <h5 className="text-primary text-lg font-normal">{printNumberWithCommas(props.price)} đ</h5>
      )}
    </div>
  );
}

export default GeneralInfor;
