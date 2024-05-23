import { useState, useEffect } from 'react';
import ProductList from './ProductList';
import Spinner from './Spinner';
import { db } from '../config/firebase';
import { getDocs, collection, query, limit } from 'firebase/firestore';

const ProductLists = ({ isHome = '' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const storeItemsRef = collection(db, "storeItem")
  useEffect(() => {
    // Get All Items
    const getAllItems = async () => {
      try {
        let fetchData = [];
        if(isHome == "home"){
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
    getAllItems();
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
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
