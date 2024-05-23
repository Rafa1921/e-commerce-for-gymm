import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth } from '../config/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../config/firebase';
import { getDocs, getDoc, doc, collection, query, where, addDoc, updateDoc } from 'firebase/firestore';


const ProductPage = ({ deleteProduct }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = useLoaderData();
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState('');
  const [checkRole, setCheckRole] = useState('')

  const cartRef = collection(db, "cart");
  const userCartRef = collection(db, "userCart");
  


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user == null || user == undefined) {
        return navigate("/login");
      } 
      setUser(user.email);
      setCheckRole(user.displayName);
    });

  }, [user]);
  const onDeleteClick = (productId) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this product?'
    );

    if (!confirm) return;

    deleteProduct(productId);

    toast.success('Product deleted successfully');

    navigate('/products');
  };



  // Add Product to Cart
  const addProductToCart = async () => {
    try {

      let cartId = '';
      cartId = await getCartId();
      console.log("cartId: ", cartId)

      if (cartId != '') {


        const q = query(cartRef, where("cart_id", "==", cartId), where("product_id", "==", id));
        const querySnapshot = await getDocs(q);

        let result = '';
        let resultData = '';

        querySnapshot.forEach((doc) => {
          result = doc.id;
          resultData = doc.data();
        });


        if (result == '') {
          addDoc(cartRef, {
            cart_id: cartId,
            product_id: id,
            product_name: product.itemName,
            product_image: product.itemImage,
            product_price: product.itemPrice,
            product_shipping: product.itemShipping,
            quantity: quantity
          });
        } else {
          console.log("This is result: " + resultData)
          const docRef = doc(db, "cart", result);

          await updateDoc(docRef, {
            quantity: parseInt(quantity) + parseInt(resultData.quantity)
          });

          toast.success('Product Added to Cart');

        }


      } else {

        await addDoc(userCartRef, {
          authEmail: user,
          isActive: true
        }
        ).then(docRef => {
          console.log("Newly Added ID: " + docRef.id)
          addDoc(cartRef, {
            cart_id: docRef.id,
            product_id: id,
            product_name: product.itemName,
            product_image: product.itemImage,
            product_price: product.itemPrice,
            product_shipping: product.itemShipping,
            quantity: parseInt(quantity)
          }
          )
          toast.success('Product Added to Cart');
        }).catch(error => {
          console.error(error);
        })

      }

    } catch (err) {
      console.error(err);
    }
  };

  const getCartId = async () => {
    try {
      console.log(user);
      const q = await query(userCartRef, where("authEmail", "==", user));
      const querySnapshot = await getDocs(q);

      let cartId = '';
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        cartId = doc.id;
      });
      return cartId;
      console.log(data);
    } catch (err) {
      console.log("Something went wrong");
    }
  };



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

      <section className='bg-indigo-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <main>
              <div className='bg-white p-6 rounded-lg shadow-md text-center md:text-left'>
                <div className='grid grid-cols-1 md:grid-cols-30/70 w-full gap-6'>
                  <main className='ml-5'>
                    <h1 className='text-3xl font-bold mb-4'>{product.itemName}</h1>

                    <div className="flex justify-normal">
                      <img className="object-cover h-64 w-96 content-center rounded-lg" src={product.itemImage} alt="image description" />


                    </div>
                  </main>

                  <aside>

                    <div className='bg-white p-6 rounded-lg shadow-md'>
                      <h3 className='text-indigo-800 text-lg font-bold mb-6'>
                        Product Description
                      </h3>
                      {/* <h2 className='text-2xl'>{product.itemCategory}</h2> */}


                      <hr className='my-4' />
                      <p className='mb-4'>{product.itemDesc}</p>

                      <hr className='my-4' />


                      <form className='justify-normal w-44'>

                        <div className='mb-4'>
                          <label
                            htmlFor='quantity'
                            className='block text-gray-700 font-bold mb-2'
                          >
                            Quantity
                          </label>
                          <input
                            id='quantity'
                            type='number'
                            min={1}
                            name='quantity'
                            className='border rounded w-full py-2 px-3'
                            placeholder='Enter Available quantitys'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                          />
                        </div>

                        <Link
                          onClick={addProductToCart}
                          className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                        >
                          Add to Cart
                        </Link>
                      </form>
                    </div>

                  </aside>
                </div>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              <div className='bg-white p-6 rounded-lg shadow-md'>
                <h3 className='text-xl font-bold mb-6'>Price & Stocks</h3>


                <hr className='my-4' />

                <div className=''>
                  <span className='font-bold'>Price:</span>
                  <p className='bg-gray-100 text-gray-800 font-bold text-2xl rounded-xl shadow-md w-fit py-2 px-4'>&#8369; {product.itemPrice}</p>
                </div>

                <div className=''>
                  <span className='font-bold'>Shipping Fee:</span>
                  <p className='bg-gray-100 text-gray-800 font-bold text-2xl rounded-xl shadow-md w-fit py-2 px-4'>&#8369; {product.itemShipping}</p>
                </div>

                <div className=''>
                  <span className='font-bold'>Stock:</span>
                  <p className='bg-gray-100 text-gray-800 font-bold text-2xl rounded-xl shadow-md w-fit py-2 px-4'> {product.itemStock}</p>
                </div>

              </div>

              <div className={checkRole=="Regular"?"hidden":"bg-white p-6 rounded-lg shadow-md mt-6"}>
                <h3 className='text-xl font-bold mb-6'>Manage product</h3>

                <Link
                  to={`/edit-product/${id}`}
                  className='bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Edit Product
                </Link>
                <button
                  onClick={() => onDeleteClick(id)}
                  className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block'
                >
                  Delete Product
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const productLoader = async ({ params }) => {

  const docRef = doc(db, "storeItem", params.id);

  // setProductId(params.id);

  const getItem = async () => {
    try {
      const fetchData = await getDoc(docRef);
      const data = fetchData.data();

      return data;

    } catch (err) {
      console.error(err);
    }
  };

  return getItem();
};

export { ProductPage as default, productLoader };
