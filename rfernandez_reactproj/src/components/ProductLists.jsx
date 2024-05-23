import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Spinner from './Spinner';
import { db } from '../config/firebase';
import { getDocs, collection, query, limit, where } from 'firebase/firestore';
import 'flowbite'

const ProductLists = ({ isHome = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorySearch, setCategorySearch] = useState('');
  const [searchText, setSearchText] = useState(true);

  const storeItemsRef = collection(db, "storeItem")

  let category = '';
  let searchTerm = '';

  useEffect(() => {
    // Get All Items

    getAllItems();


  }, []);

  const getAllItems = async () => {
    try {
      let fetchData = [];
      if (isHome == "home") {
        const q = query(storeItemsRef, limit(4));
        fetchData = await getDocs(q);
      } else {
        fetchData = await getDocs(storeItemsRef);
      }
      const data = fetchData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchProduct = async () => {
    setLoading(true);
    if (searchTerm == "")
      return getAllItems()
    try {
      let fetchData = [];

      let searchTermArray = searchTerm.toLowerCase().split(" ");
      const q = query(storeItemsRef, where("itemSearch", "array-contains-any", searchTermArray))

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <section className='bg-blue-50 px-4 py-10'>



      <div className={isHome == 'home' ? 'hidden' : 'max-w-md mx-auto mb-10'}>
        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                searchProduct()
              }
            }}
            id="default-search" onChange={(e) => searchTerm = e.target.value} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Dumbbells, Food Supplements..." />
          <button type="" onClick={searchProduct} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </div>




      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-extrabold text-indigo-700 mb-6 text-center'>
          {isHome == "home" ? 'New Items' : 'Browse All Products'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
            {products.map((product) => (
              <ProductList key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default ProductLists;
