import OrderLists from '../components/OrderLists';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user == null || user == undefined) {
          return navigate("/login");
      }

      setUser(user.email);
    });
  
  }, []);

  return (
    <section className='bg-blue-50 px-4 py-6'>
      <OrderLists email={user}/>
    </section>
  );
};
export default OrdersPage;
