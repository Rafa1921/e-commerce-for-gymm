import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import { auth, db } from './config/firebase';
import { updateProfile } from 'firebase/auth';
import { getDocs, getDoc, collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useEffect } from 'react';
import AddProductPage from './pages/AddProductPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage, { productLoader } from './pages/ProductPage';
import UpdateProductPage from './pages/UpdateProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderPage from './pages/OrderPage';
import OrdersPage from './pages/OrdersPage';
import OrderView from './components/OrderView';
import ProfilePage from './pages/ProfilePage';


const App = () => {

  

  const storeItemsRef = collection(db, "storeItem");
  const itemAnalyticsRef = collection(db, "itemAnalytics");


  if (auth?.currentUser?.displayName == null) {
    updateProfile(auth.currentUser, {
      displayName: "Regular"
    })

  }
  // Get All Items
  const getAllItems = async (job) => {
    try {
      const fetchData = await getDocs(storeItemsRef);
      const data = fetchData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    const docRef = doc(db, "storeItem", id);
    try {
      await deleteDoc(docRef);
    } catch (error) {
      console.error(err);
    }


  };

  // Update Product
  const updateProduct = async (id, updatedProduct) => {
    const docRef = doc(db, "storeItem", id);
    await updateDoc(docRef, {
      itemName: updatedProduct.name,
      itemDesc: updatedProduct.description,
      itemCategory: updatedProduct.category,
      itemImage: updatedProduct.image,
      itemPrice: updatedProduct.price,
      itemStock: updatedProduct.stock,
      itemShipping: updatedProduct.shipping,
      isActive: true,
    });
  };


  // Add New Product
  const addNewProduct = async (newProduct) => {
    try {

      await addDoc(storeItemsRef, {
        itemName: newProduct.name,
        itemDesc: newProduct.description,
        itemCategory: newProduct.category,
        itemImage: newProduct.image,
        itemPrice: newProduct.price,
        itemStock: newProduct.stock,
        itemShipping: newProduct.shipping,
        isActive: true,
      }).then(docRef => {
        addDoc(itemAnalyticsRef, {
          itemId: docRef.id,
          itemName: newProduct.name,
          itemCategory: newProduct.category,
          itemImage: newProduct.image,
          itemPrice: newProduct.price,
          itemPurchases: 0,
          itemLastPurchased: new Date(),
          isActive: true,
        })

      }).catch(error => {
        console.error(error);
      })


    } catch (err) {
      console.error(err);
    }
  };




  console.log("email: " + auth?.currentUser?.email)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route path='/login' element={<LoginPage />} />
        <Route index element={<HomePage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/orders' element={<OrdersPage />} />
        <Route path='/add-products' element={<AddProductPage addProductSubmit={addNewProduct} />} />
        <Route
          path='/edit-product/:id'
          element={<UpdateProductPage updateProductSubmit={updateProduct} />}
          loader={productLoader}
        />
        <Route
          path='/profile-page'
          element={<ProfilePage />}
        />
        <Route
          path='/products/:id'
          element={<ProductPage deleteProduct={deleteProduct} />}
          loader={productLoader}
        />
        <Route
          path='/orders/:id'
          element={<OrderView />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
