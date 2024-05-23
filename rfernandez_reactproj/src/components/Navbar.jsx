import { NavLink, Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { auth, db } from '../config/firebase';
import { onAuthStateChanged, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import 'flowbite';
import { collection, getDocs, query, where } from 'firebase/firestore';



const Navbar = () => {
  const linkclassName = ({ isActive }) =>
    isActive
      ? 'bg-gray-900 font-bold text-white hover:white hover:text-white hover:font-bold rounded-md px-3 py-2'
      : 'text-white hover:bg-white hover:text-gray-800 hover:font-bold rounded-md px-3 py-2';

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkRole, setCheckRole] = useState('');
  const [email, setEmail] = useState('')

  let id = 0;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("nav: " + user);
      if (user != null || user != undefined) {
        setIsLoggedIn(true);

      } else {
        setIsLoggedIn(false);
      }
      setEmail(user.email)

      if (user.displayName == "" || user.displayName == null) {
        updateProfile(auth.currentUser, {
          displayName: "Regular"
        })
      }
      setCheckRole(user.displayName)

    });

  }, []);

  const navigate = useNavigate();

  const logOut = async () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Logged out successfully")
      return navigate('/login')
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <nav className='bg-indigo-700 border-b border-indigo-500'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex h-20 items-center justify-between'>
          <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
            <NavLink className='flex flex-shrink-0 items-center mr-4' to='/'>

              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                RepsPh Gym
              </span>
            </NavLink>
            <div className={isLoggedIn ? "md:ml-auto" : "hidden"}>
              <div className='flex space-x-2 relative'>
                <NavLink to='/' className={linkclassName}>
                  Home
                </NavLink>

                <NavLink to='/products' className={linkclassName}>
                  Product List
                </NavLink>


                <div className='text-white px-3 py-2'>
                  <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider" className="text-white hover:font-bold focus:font-bold text-center inline-flex items-center" type="button">Account <FaAngleDown className='inline ml-1' />
                  </button>
                  <div id="dropdownDivider" data-dropdown-trigger="{hover|click}" className={'z-10 hidden mt-2 w-48 py-2  divide-y divide-gray-200 bg-white rounded-lg shadow-2xl absolute'}>
                    <ul>

                      <li>
                        <a href="/profile-page" className='block px-4 py-1 text-gray-800 hover:bg-indigo-600 hover:text-white'>Profile Settings</a>
                      </li>
                      <li>
                        <a href="/cart" className='block px-4 py-1 text-gray-800 hover:bg-indigo-600 hover:text-white'>Cart</a>
                      </li>
                      <li>
                        <a href="/orders" className='block px-4 py-1 text-gray-800 hover:bg-indigo-600 hover:text-white'>View Orders</a>
                      </li>
                      <Link
                        to="add-products"
                        className={checkRole == "Regular" ? "hidden" : "block px-4 py-1 mb-2 text-gray-800 hover:bg-indigo-600 hover:text-white"}
                      >
                        Add Products
                      </Link>

                    </ul>

                    <div className="">
                      <NavLink onClick={logOut} className='block px-4 py-1 text-gray-800 hover:bg-indigo-600 hover:text-white'>
                        Sign Out
                      </NavLink>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

