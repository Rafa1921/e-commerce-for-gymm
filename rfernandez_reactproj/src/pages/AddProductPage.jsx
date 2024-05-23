import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import defaultImage from '../assets/images/defaultimg.jpg';
import { storage, auth, db } from '../config/firebase';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

const AddProductPage = ({ addProductSubmit }) => {
  const [name, setName] = useState('');
  const [image, setImageSrc] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Protein');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [shipping, setShipping] = useState('');
  const [imageViewer, setImageViewer] = useState(defaultImage);

  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const uploadImage = (e) => {
    console.log('src: ' + e.target.value)
    // setImageSrc(e.target.value);
    setImageViewer(URL.createObjectURL(e.target.files[0]));

    const imageFile = e.target.files[0];

    if (imageFile == null) return;

    const fileId = imageFile.name.split('/')[0] + "-" + v4();
    const formatFile = imageFile.type.split('/')[1];
    const imageRef = ref(storage, `images/${fileId}.${formatFile}`)

    const uploadTask = uploadBytesResumable(imageRef, imageFile);



    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.error(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageSrc(downloadURL);
          console.log('File available at', downloadURL);
        });
      }
    );



    console.log('new src: ' + imageViewer)
  }


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user == null || user == undefined) {
        return navigate("/login");
      }

      setEmail(user.email);
      
      getId()
      if (user.displayName == "Regular") {
        return navigate("/");
      }
    });




  }, []);

  const getId = async () => {
    try {

      const userDetailsRef = collection(db, "userDetails");
      const q = query(userDetailsRef, where("authEmail", "==", email));

      console.log("emmm: " + auth.currentUser.email)
      const querySnapshot = await getDocs(q);

      let docId = '';
      querySnapshot.forEach((doc) => {
        docId = doc.data().isAdmin
        setRole(doc.data().isAdmin)
      });

      return docId;
    } catch (err) {
      console.log(err);
    }
  };


  const submitForm = (e) => {
    e.preventDefault();

    const newItem = {
      name,
      description,
      image,
      category,
      price,
      stock,
      shipping
    };

    addProductSubmit(newItem);

    toast.success('Product Added Successfully');

    return navigate('/products');
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 content-center'>
          <form onSubmit={submitForm}>
            <div className='flex justify-center'>
              <h2 className="font-extrabold text-2xl text-center text-white bg-indigo-700 rounded-xl shadow-md py-4 px-4 mb-6">New Product</h2>
            </div>

            <div className="flex justify-center items-center">
              <img className="object-cover h-60 w-96 content-center" src={imageViewer} alt="image description" />


            </div>

            <input className="block w-full text-sm mb-20 mt-5 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white" id="file_input" type="file" onChange={uploadImage} />

            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Product Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='eg. 50kg Barbell Set'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Description
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='Add any description to the product such as color, weight, brand, functionality etc'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Category
              </label>
              <select
                id='category'
                name='category'
                className='border rounded w-full py-2 px-3'
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value='Protein'>Protein</option>
                <option value='Carbs'>Carbs</option>
                <option value='Sugar Free'>Sugar Free</option>
                <option value='Supplements'>Supplements</option>
                <option value='Barbell Plates'>Barbell Plates</option>
                <option value='Dumbbells'>Dumbbells</option>
                <option value='Weights'>Weights</option>
                <option value='Services'>Services</option>
                <option value='Gym Equipments'>Gym Equipments</option>
                <option value='Gym Accessories/Clothing'>Gym Accessories/Clothing</option>
              </select>
            </div>

            <h3 className='text-2xl mb-5 mt-10 font-bold'>Pricing Information</h3>

            <div className='mb-4'>
              <label
                htmlFor='price'
                className='block text-gray-700 font-bold mb-2'
              >
                Price
              </label>
              <input
                id='price'
                type='number'
                name='price'
                className='border rounded w-full py-2 px-3'
                placeholder='Price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='stock'
                className='block text-gray-700 font-bold mb-2'
              >
                Stock
              </label>
              <input
                id='stock'
                type='number'
                name='stock'
                className='border rounded w-full py-2 px-3'
                placeholder='Enter Available Stocks'
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='shipping'
                className='block text-gray-700 font-bold mb-2'
              >
                Shipping Fee
              </label>
              <input
                type='number'
                id='shipping'
                name='shipping'
                className='border rounded w-full py-2 px-3 mb-20'
                placeholder='Enter Shipping Fee'
                required
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              />
            </div>


            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                type='submit'
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddProductPage;
