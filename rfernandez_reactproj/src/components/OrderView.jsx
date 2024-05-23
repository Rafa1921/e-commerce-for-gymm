import { useState, useEffect } from 'react';
import CartProductList from './CartProductList';
import Spinner from './Spinner';
import { db } from '../config/firebase';
import { getDocs, getDoc, doc, collection, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import 'flowbite';
import { Link, useParams } from 'react-router-dom';

const OrderView = ({ email }) => {
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [cart, setCart] = useState(0);
  const [label, setLabel] = useState('');
  const [orderCost, setOrderCost] = useState(0);
  const [user, setUser] = useState('');
  const { id } = useParams();

  const orderRef = collection(db, "order");
  const orderUserCartRef = collection(db, "orderUserCart");
  const userCartRef = collection(db, "userCart");
  const cartRef = collection(db, "cart");

  useEffect(() => {
    // Get All Items


    const getCardData = async () => {
      let cartId = '';
      let orderId = '';

      const docRef = doc(db, "orderUserCart", id);

      try {
        const fetchData = await getDoc(docRef);
        const data = fetchData.data();

        cartId = data.cartId;

      } catch (err) {
        console.error(err);
      }

      console.log("cartidss: " + id)
      try {
        const q = query(orderRef, where("order_id", "==", id));

        const querySnapshot = await getDocs(q);


        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          orderId = doc.id
          setLabel(doc.data().order_label)
          setShipping(doc.data().order_shipping)
          setCart(doc.data().order_productCost)
          setOrderCost(doc.data().order_totalCost)
          setPaymentMethod(doc.data().order_paymentMethod)
          setAddress(doc.data().order_address)
          setPhone(doc.data().order_phone)
        });

      } catch (err) {
        console.log(err);
      }

      const q = query(cartRef, where("cart_id", "==", cartId));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProducts(data);


      setLoading(false);
    };
    getCardData();
  }, [email]);


  return (


    <section className='bg-indigo-50'>
      <div className='container m-auto py-10 px-6 '>
        <div className="font-extrabold text-2xl text-white bg-indigo-700 rounded-xl shadow-md w-fit py-4 px-4">Order #{label}</div>
        <div className="mt-5 ml-10">
          <ul className='list-disc'>
            <li> <span className='font-bold'>Thank you for purchasing!</span> The items you've ordered will be packed and shipped shortly </li>
            <li> If you have any questions or problems about your order, please reach out to us using our  <span className='font-bold'>Chat Help</span> or call us at <span className='font-bold'>(02) 992-2244-1045</span> </li>
          </ul>
        </div>

      </div>
      <div className='container m-auto py-10 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
          <main>
            <div className="font-bold text-2xl text-indigo-800 mb-10  underline underline-offset-8">Items Purchased</div>
            <div className='container-xl lg:container m-auto'>

              {loading ? (
                <Spinner loading={loading} />
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
                  {products.map((product) => (
                    <CartProductList key={product.id} product={product} />
                  ))}


                </div>
              )}
            </div>
          </main>

          {/* <!-- Sidebar --> */}
          <aside>

            <div className='bg-white p-6 rounded-lg shadow-md'>
              <h3 className='text-2xl font-bold mb-14 text-indigo-700 underline underline-offset-8'>Checkout Information</h3>

              <div className='grid grid-cols-2 md:grid-cols-2 gap-2 text-xl'> <span className='font-bold'>Shipping: </span><span>&#8369; {shipping}</span></div>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-2 mb-5 text-xl'> <span className='font-bold'>Product Costs: </span><span>&#8369; {cart}</span></div>


              <div className='grid grid-cols-2 md:grid-cols-2 gap-2 mb-10 text-xl'> <span className='font-bold '>Order Total: </span><span>&#8369; {shipping + cart}</span></div>



              <h3 className='text-2xl font-bold mb-14 text-indigo-700 underline underline-offset-8'>Delivery Information</h3>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-1 text-xl '> <span className='font-bold'>Address: </span><span className='text-sm'>{address}</span></div>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-1 text-xl mb-10'> <span className='font-bold'>Phone: </span><span className='text-sm'>{phone}</span></div>


              <h3 className='text-2xl font-bold mb-5 text-indigo-700 underline underline-offset-8'>Payment Method</h3>



              <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mb-1 ">
                <input id="bordered-radio-1" type="radio" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} name="bordered-radio" disabled checked class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                <label for="bordered-radio-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">{paymentMethod}</label>
              </div>


            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
export default OrderView;
