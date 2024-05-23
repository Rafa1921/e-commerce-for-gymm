import CartProductLists from '../components/CartProductLists';
import { auth } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

const CartPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user == null || user == undefined) {
        return navigate("/login");
      }

      setEmail(user.email);
    });

  }, []);

  return (
    <>

      <CartProductLists email={email} />

    </>


  );
};
export default CartPage;
