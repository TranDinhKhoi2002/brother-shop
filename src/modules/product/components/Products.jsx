import ProductItem from './ProductItem';

function Products({ products, forDetail }) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
        {products.map((product, index) => (
          <ProductItem forDetail={forDetail} key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
