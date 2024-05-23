import { useState } from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const OrderList = ({ order }) => {

  return (
    <div className='bg-white rounded-xl shadow-md relative'>
      <div className='p-4'>
        <div className='mb-6'>
          {/* <div className='text-gray-600 my-2'>{order.type}</div> */}
          <h3 className='text-xl font-bold'>{order.order_label}</h3>
        </div>

        <h3 className='text-indigo-500 mb-2'>Total: &#8369;{order.order_totalCost} </h3>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='mb-3'>
            {order.order_paymentMethod}
          </div>
          <Link
            to={`/orders/${order.order_id}`}
            className='h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
};
export default OrderList;
