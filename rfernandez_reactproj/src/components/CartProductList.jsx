import { useLocation } from 'react-router-dom';
import {FaTrash} from 'react-icons/fa'
import { auth, db } from '../config/firebase';
import { getDocs, getDoc, doc, collection, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';



const CartProductList = ({ product }) => {
  const location = useLocation();
  const [user, setUser] = useState('');
  let cartId = '';
  let cartRefId = '';
  
  const orderRef = collection(db, "order");
  const orderUserCartRef = collection(db, "orderUserCart");
  const userCartRef = collection(db, "userCart");
  const cartRef = collection(db, "cart");


  useEffect(() => {
    // Get All Items


    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user == null || user == undefined) {
          return navigate("/login");
      }

      setUser(user.email);
    });




  }, [user]);


  const onDeleteClick = async (productId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirm) return;
    cartId = await getDocId("cart")
    console.log("cartId: " + cartId)
    cartRefId = await getDocId("cartRef", cartId)
    console.log("cartRefId: " + cartRefId)
    

    const docRef = doc(db, "cart", cartRefId);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error(err);
    }


    toast.success('Product deleted successfully');
    window.location.reload()

    navigate('/products');
  };

  const getDocId = async (type, docID = "") => {
    try {
      let q = '';

      if (type == "cart") {
        q = query(userCartRef, where("authEmail", "==", user));
      } else if (type == "cartRef") {
        q = query(cartRef, where("cart_id", "==", docID));
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
    <div className='bg-white rounded-xl shadow-md w-50'>
      <div className='p-4 w-50 pr-10 pl-5'>

        <div className="grid grid-cols-1 md:grid-cols-30/70 w-full gap-6">
          <main>
            <div className="flex justify-center items-center">
              <img className="object-cover h-32 w-64 content-center rounded-lg" src={product.product_image} alt="image description" />


            </div>

          </main>

          <aside>
            <div className='flex flex-col lg:flex-row justify-between mb-4'>
              <div className=' mb-3'>
                <h3 className='text-xl font-bold'>{product.product_name}</h3>
              </div>
              <div className="">
                <h3 className='text-white bg-indigo-700 font-bold text-2xl rounded-xl shadow-md w-fit py-2 px-4'>&#8369; {product.product_price} </h3>

              </div>
            </div>

            <div className='flex flex-col lg:flex-row justify-between mb-4'>
              <div className='mb-3'>

               
              </div>
              <div>
                <h3 className='text-black inline'> {product.quantity} qty</h3>

              </div>

            </div>
            <div className='border border-gray-100 mb-5'></div>

            <div className='flex flex-col lg:flex-row justify-between mb-4'>
              <div className=''>

                +&#8369;{product.product_shipping} Shipping
              </div>

              <div className={location.pathname=="/cart"?"text-red-600 hover:text-red-800 cursor-pointer":"hidden"} >

                <FaTrash onClick={onDeleteClick}/>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};
export default CartProductList;
