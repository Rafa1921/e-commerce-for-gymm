import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import ViewAllProducts from '../components/ViewAllProducts';
import ProductLists from '../components/ProductLists';

const HomePage = () => {
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
    <>
      <Hero />
      <ProductLists isHome={'home'} />
      <ViewAllProducts />
    </>
  );
};
export default HomePage;
