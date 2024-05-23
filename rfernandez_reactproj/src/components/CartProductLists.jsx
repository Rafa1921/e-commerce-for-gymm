import { useState, useEffect } from 'react';
import CartProductList from './CartProductList';
import Spinner from './Spinner';
import { db } from '../config/firebase';
import { getDocs, getDoc, doc, collection, query, where, addDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

const CartProductLists = ({ email }) => {
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shipping, setShipping] = useState(0);
  const [cart, setCart] = useState(0);
  const [orderCost, setOrderCost] = useState(0);
  const [user, setUser] = useState('');

  const navigate = useNavigate();

  const orderRef = collection(db, "order");
  const orderUserCartRef = collection(db, "orderUserCart");
  const userCartRef = collection(db, "userCart");
  const cartRef = collection(db, "cart");

  useEffect(() => {
    // Get All Items


    const getCardData = async () => {
      let docId = '';
      docId = await getDocId('cart');



      const q = query(cartRef, where("cart_id", "==", docId));

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


  const onDeleteClick = async (productId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirm) return;

    const cartId = getDocId("cart")
    const cartRefId = getDocId("cartRef", cartId)

    const docRef = doc(db, "cart", cartRefId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error(err);
    }


    toast.success('Product deleted successfully');

    navigate('/products');
  };




  // Proceed to Checkout
  const proceedCheckout = async () => {
    try {

      let docId = '';
      docId = await getDocId();

      const ordId = await getDocId('order', docId);
      console.log("docId: ", docId)

      if (docId != '') {

        const docRef = doc(db, "order", ordId);

        await updateDoc(docRef, {
          order_shipping: shipping,
          order_productCost: cart,
          order_totalCost: shipping + cart
        });

        return navigate('/checkout');

      } else {

        await addDoc(orderUserCartRef, {
          authEmail: email,
          cartId: await getDocId('cart'),
          isActive: true
        }
        ).then(docRef => {
          console.log("Newly Added ID: " + docRef.id)
          addDoc(orderRef, {
            order_id: docRef.id,
            authEmail: email,
            order_label: "",
            order_shipping: shipping,
            order_productCost: cart,
            order_totalCost: shipping + cart,
            order_address: "1234 Tandang Sora Ave., Quezon City 1890",
            order_paymentMethod: "Cash",
          }
          )




          return navigate('/checkout');
        }).catch(error => {
          console.error(error);
        })

      }

    } catch (err) {
      console.error(err);
    }
  };



  const getDocId = async (type, docID = "") => {
    try {
      let q = '';

      if (type == "cart") {
        q = query(userCartRef, where("authEmail", "==", email));
      } else if (type == "order") {
        q = query(orderRef, where("order_id", "==", docID));
    }  else if (type == "cartRef") {
        q = query(cartRef, where("cart_id", "==", docID));
      } else {
        q = query(orderUserCartRef, where("authEmail", "==", email), where("isActive", "==", true));
      }


      const querySnapshot = await getDocs(q);

      let docId = '';
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
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
        <div className="font-extrabold text-2xl text-white bg-indigo-700 rounded-xl shadow-md w-fit py-4 px-4">Cart Page</div>

      </div>
      <div className='container m-auto py-10 px-6'>
        <div className='grid grid-cols-1 md:grid-cols-70/30 gap-6'>
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
              <h3 className='text-2xl font-bold mb-24 text-indigo-700 underline underline-offset-8'>Cart Information</h3>

              <div className='grid grid-cols-2 md:grid-cols-2 gap-2 text-xl'> <span className='font-bold'>Shipping: </span><span>&#8369; {shipping}</span></div>
              <div className='grid grid-cols-2 md:grid-cols-2 gap-2 mb-5 text-xl'> <span className='font-bold'>Product Costs: </span><span>&#8369; {cart}</span></div>


              <div className='grid grid-cols-2 md:grid-cols-2 gap-2 mb-10 text-xl'> <span className='font-bold'>Order Total: </span><span>&#8369; {shipping + cart}</span></div>

              <form>
                <Link
                  onClick={proceedCheckout}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Proceed to Checkout
                </Link>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};
export default CartProductLists;
