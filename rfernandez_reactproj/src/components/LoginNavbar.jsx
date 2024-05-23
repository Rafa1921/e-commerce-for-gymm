import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

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
              <img className='h-10 w-auto' src={logo} alt='React Jobs' />
              <span className='hidden md:block text-white text-2xl font-bold ml-2'>
                React Jobs
              </span>
            </NavLink>
            <div className={auth.currentUser == null ? "hidden" : "md:ml-auto"}>
              <div className='flex space-x-2'>
                <NavLink to='/' className={linkClass}>
                  Home
                </NavLink>
                <NavLink to='/jobs' className={linkClass}>
                  Jobs
                </NavLink>
                <NavLink to='/add-job' className={linkClass}>
                  Add Job
                </NavLink>
                <NavLink onClick={logOut} className='text-white hover:bg-red-500 hover:text-white rounded-md px-3 py-2'>
                  Logout
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;