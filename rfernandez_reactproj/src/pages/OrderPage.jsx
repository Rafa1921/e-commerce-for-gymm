import CheckoutLists from '../components/CheckoutLists';
import { auth } from '../config/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

const OrderPage = () => {
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
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            to='/products'
            className='text-indigo-500 hover:text-indigo-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Product Listings
          </Link>
        </div>
      </section>
      <CheckoutLists email={email} />

    </>


  );
};
export default OrderPage;
