import { useState, useEffect } from 'react';
import Spinner from './Spinner';
import { db, auth } from '../config/firebase';
import { getDocs, collection, query, limit, where } from 'firebase/firestore';
import OrderList from './OrderList';
import { onAuthStateChanged } from 'firebase/auth';

const OrderLists = ({ email }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');

  const orderRef = collection(db, "order")
  const orderUserCartRef = collection(db, "orderUserCart")
  useEffect(() => {
    // Get All Items
   

    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user == null || user == undefined) {
          return navigate("/login");
      }

      setUser(user.email);
    });


    getAllItems();
  }, [email]);

  const getAllItems = async () => {
    if (email == null){
      email = user;
    }

    
    console.log("order email: " + user)
    try {
      const q = query(orderRef, where("authEmail", "==", user),);
      
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setOrders(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }


  };

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          Browse All Orders
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {orders.map((order) => (
              <OrderList key={order.order_id} order={order} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default OrderLists;
