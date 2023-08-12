import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch('GA18Y4DU9L', '3fc1c942c82141e5c69d124592f6b20c');
const index = searchClient.initIndex('product');

export { searchClient };
export default index;
