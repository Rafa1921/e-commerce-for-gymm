import { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, storage } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import defaultImage from '../assets/images/defaultimg.jpg';
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const UpdateProductPage = ({ updateProductSubmit }) => {
  const product = useLoaderData();
  const [name, setName] = useState(product.itemName);
  const [image, setImageSrc] = useState(product.itemImage);
  const [description, setDescription] = useState(product.itemDesc);
  const [category, setCategory] = useState(product.itemCategory);
  const [price, setPrice] = useState(product.itemPrice);
  const [stock, setStock] = useState(product.itemStock);
  const [shipping, setShipping] = useState(product.itemShipping);

  const [imageViewer, setImageViewer] = useState(defaultImage);


  const uploadImage = (e) => {
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

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user == null || user == undefined) {
          return navigate("/login");
      }
    });
  
  }, []);
  const submitForm = (e) => {
    e.preventDefault();

    const updatedproduct = {
      name,
      description,
      image,
      category,
      price,
      stock,
      shipping
    };

    updateProductSubmit(id, updatedproduct);

    toast.success('Product updated successfully');

    return navigate(`/products/${id}`);
  };

  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 content-center'>
          <form onSubmit={submitForm}>
          <div className='flex justify-center'>
            <h2 className="font-extrabold text-2xl text-center text-white bg-indigo-700 rounded-xl shadow-md py-4 px-4 mb-6">Update Product</h2>
            </div>



            <div className="flex justify-center items-center">
            <img class="object-cover h-60 w-96 content-center" src={imageViewer} alt="image description" />


            </div>
          

            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload picture</label>
            <input class="block w-full text-sm mb-20 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-white" id="file_input" type="file" onChange={uploadImage} />

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
                category
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
                <option value='carbs'>Carbs</option>
                <option value='sugarfree'>Sugar Free</option>
                <option value='supplements'>Supplements</option>
                <option value='plates'>Barbell Plates</option>
                <option value='dumbbell'>Dumbbells</option>
                <option value='weights'>Weights</option>
                <option value='services'>Services</option>
                <option value='gymequipments'>Gym Equipments</option>
                <option value='accessories'>Gym Accessories/Clothing</option>
              </select>
            </div>

            <h3 className='text-2xl mb-5'>Pricing Information</h3>

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
                className='border rounded w-full py-2 px-3'
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
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default UpdateProductPage;
