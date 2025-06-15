import { useEffect, useState } from "react";
import axios from "../utils/axios";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";

const Store = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const [products, setProducts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProducts = (page = 1) => {
    // Build URL with either search or category param (search preferred if both)
    let url = `/store/products/?page=${page}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    } else if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.results);
        setNextPage(res.data.next);
        setPrevPage(res.data.previous);
        setCurrentPage(page);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // Reset to page 1 when either search or category changes
    fetchProducts(1);
  }, [search, category]);

  return (
    <section className="padding-x py-10">
      <div className="max-container">
        <h2 className="text-2xl font-bold mb-6">Products</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="flex justify-center mt-10 gap-4">
          <button
            onClick={() => fetchProducts(currentPage - 1)}
            disabled={!prevPage}
            className="px-4 py-2 bg-gray-300 disabled:opacity-50 rounded"
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
