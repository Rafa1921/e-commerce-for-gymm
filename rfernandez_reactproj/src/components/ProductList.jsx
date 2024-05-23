import { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductList = ({ product }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = product.itemDesc;

  if (!showFullDescription) {
    description = description.substring(0, 90) + '...';
  }

  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>

      <div className="flex justify-center items-center">
              <img className="object-cover h-60 w-96 content-center" src={product.itemImage} alt="image description" />


            </div>



        <div className='border border-gray-100 mb-5'></div>
        <div className='mb-6'>
          {/* <div className='text-gray-600 my-2'>{product.type}</div> */}
          <h3 className='text-xl font-bold'>{product.itemName}</h3>
        </div>
        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='mb-3'>
            <h3 className='text-indigo-500 text-xl font-bold'>&#8369;{product.itemPrice} </h3>
          </div>
          <Link
            to={`/products/${product.id}`}
            className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
