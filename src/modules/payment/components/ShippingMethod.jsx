import Image from 'next/image';

function ShippingMethod({ method, title, desc }) {
  return (
    <div className="flex items-center gap-5">
      <Image src={`/assets/images/${method}.svg`} alt="" width={50} height={50} />
      <div>
        <h4 className="font-medium uppercase">{title}</h4>
        <p className="text-sm font-light">{desc}</p>
      </div>
    </div>
  );
}

export default ShippingMethod;
