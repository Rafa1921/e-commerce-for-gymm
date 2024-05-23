import { useState, useEffect } from 'react';
import CartProductList from './CartProductList';
import Spinner from './Spinner';
import { db } from '../config/firebase';
import { getDocs, getDoc, doc, collection, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import 'flowbite';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CheckoutLists = ({ email }) => {
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cart, setCart] = useState(0);
  const [address, setAddress] = useState(true);
  const [phone, setPhone] = useState(true);
  const [orderCost, setOrderCost] = useState(0);
  const [user, setUser] = useState('');

  const navigate = useNavigate();


  const orderRef = collection(db, "order");
  const orderUserCartRef = collection(db, "orderUserCart");
  const userCartRef = collection(db, "userCart");
  const cartRef = collection(db, "cart");
  const itemAnalyticsRef = collection(db, "itemAnalytics");
  const userDetailsRef = collection(db, "userDetails");


  useEffect(() => {
    // Get All Items

    getDetails();


    const getCardData = async () => {
      let cartId = '';
      cartId = await getDocId('cart');


      const q = query(cartRef, where("cart_id", "==", cartId));

      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setProducts(data);

      for (const product of data) {
        setShipping(prevShipping => prevShipping + parseInt(product.product_shipping));
        setCart(prevCart => prevCart + (parseInt(product.product_price) * product.quantity));
        setOrderCost(prevOrderCost => prevOrderCost + parseInt(shipping) + parseInt(cart));

      }

      setLoading(false);
    };
    getCardData();
  }, [email]);

  const getDetails = async () => {
    const getDetails = await getDocId('account');
  }

  // Proceed to Checkout
  const placeOrder = async () => {
    try {

      let docId = '';
      let cartId = '';
      docId = await getDocId();
      cartId = await getDocId('cart');

     

      if (docId != '') {

        const q = query(orderRef, where("order_id", "==", docId));
        const querySnapshot = await getDocs(q);

        let result = '';

        querySnapshot.forEach((doc) => {
          result = doc.id;
        });

        const docRef = doc(db, "order", result);

        await updateDoc(docRef, {
          order_label: "ORD" + Math.floor((Math.random() * 100000000) + 1).toString(),
          order_shipping: shipping,
          order_productCost: cart,
          order_address: address,
          order_phone: phone,
          order_totalCost: shipping + cart,
          order_paymentMethod: paymentMethod
        });
        

        let updateItem = {
          itemPurchases: 0,
          itemLastPurchased: new Date(),
        }

        const newArray = ['staff', 'trainee'].map(item => ({ value: item, label: item }))

        const updateAnalytics = async (data) => {

          const q3 = query(itemAnalyticsRef, where("itemId", "==", data.product_id));
          const querySnapshot3 = await getDocs(q3);

          let result3 = '';

          let prevPurchase = 0;

          querySnapshot3.forEach((doc) => {
            result3 = doc.id
            prevPurchase = doc.data().itemPurchases
          });

          const docAnalyticsRef = doc(db, "itemAnalytics", result3);
          await updateDoc(docAnalyticsRef, {
            itemPurchases: parseInt(prevPurchase) + parseInt(data.quantity),
            itemLastPurchased: new Date()
          });

        }


        const q2 = query(cartRef, where("cart_id", "==", cartId));
        const querySnapshot2 = await getDocs(q2);

        let result2 = '';

        querySnapshot2.forEach((doc) => {
          updateAnalytics(doc.data());

        });

        const q3 = query(itemAnalyticsRef, where("cart_id", "==", cartId));
        const querySnapshot3 = await getDocs(q2);





        const docOrderRef = doc(db, "orderUserCart", docId);
        await updateDoc(docOrderRef, {
          isActive: false
        });

        console.log("id to delete: " + cartId)
        const docCartRef = doc(db, "userCart", cartId);
        try {
          await deleteDoc(docCartRef);
        } catch (error) {
          console.error(err);
        }
        return navigate(`/orders/${docId}`);
      }

    } catch (err) {
      console.error(err);
    }
  };



  const getDocId = async (type) => {
    try {
      let q = '';

      if (type == "cart") {
        q = query(userCartRef, where("authEmail", "==", email));
      } else if (type == "account") {
        q = query(userDetailsRef, where("authEmail", "==", email));
      } else {
        q = query(orderUserCartRef, where("authEmail", "==", email), where("isActive", "==", true));
      }


      const querySnapshot = await getDocs(q);

      let docId = '';
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if(type == "account"){
          setAddress(doc.data().address);
          setPhone(doc.data().phone);
        }
        docId = doc.id;
      });


      return docId;
    } catch (err) {
      console.log(err);
    }
  };


  return (


    <section className='bg-indigo-50'>
      <div className='container m-auto py-10 px-6 '>
        <div className="font-extrabold text-2xl text-white bg-indigo-700 rounded-xl shadow-md w-fit py-4 px-4">Checkout Page</div>
        <div className="mt-5 ml-10">
          <ul className='list-disc'>
            <li> Please double check your items as we do not offer refunds for incorrect purchases</li>
            <li> Visit our <span className='font-bold'>Help Center</span> to know more about our Return Policies </li>
          </ul>
        </div>
      </div>
      <div className='container m-auto py-10 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
          <main>
          <div className="font-bold text-2xl text-indigo-800 mb-10  underline underline-offset-8">Items On Your Cart</div>
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
                <input id="bordered-radio-1" type="radio" value="Cash" onChange={(e) => setPaymentMethod(e.target.value)} name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                <label for="bordered-radio-1" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">Cash</label>
              </div>
              <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mb-1 cursor-pointer">
                <input id="bordered-radio-2" type="radio" value="Debit/Credit Card" onChange={(e) => setPaymentMethod(e.target.value)} name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="bordered-radio-2" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">Debit/Credit Card</label>
              </div>
              <div class="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 mb-16">
                <input id="bordered-radio-3" type="radio" value="GCash" onChange={(e) => setPaymentMethod(e.target.value)} name="bordered-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="bordered-radio-3" class="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">GCash</label>
              </div>



              <form>
                <Link
                  onClick={placeOrder}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Place Order
                </Link>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
export default CheckoutLists;
