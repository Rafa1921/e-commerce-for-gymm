import ProductLists from '../components/ProductLists';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';

const ProductsPage = () => {
  const navigate = useNavigate();

  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user == null || user == undefined) {
          return navigate("/login");
      }
    });
  
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-6'>
      <ProductLists />
    </section>
  );
};
export default ProductsPage;
