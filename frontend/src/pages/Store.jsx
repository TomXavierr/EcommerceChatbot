import { useEffect, useState } from 'react';
import axios from 'axios';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = (page = 1) => {
    axios.get(`http://127.0.0.1:8000/api/store/products/?page=${page}`)
      .then(res => {
        setProducts(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setCurrentPage(page);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="padding-x py-10">
      <div className="max-container">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-slate-gray">{product.description}</p>
              <p className="font-bold mt-2">₹{product.price}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => fetchProducts(currentPage - 1)}
            disabled={!prevPage}
            className="px-4 py-2 bg-slate-300 disabled:opacity-50 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => fetchProducts(currentPage + 1)}
            disabled={!nextPage}
            className="px-4 py-2 bg-black text-white disabled:opacity-50 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Store;
