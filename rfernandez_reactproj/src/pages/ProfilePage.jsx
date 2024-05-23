import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import defaultImage from '../assets/images/defaultimg.jpg';
import { db, auth } from '../config/firebase';
import { getDocs, getDoc, doc, collection, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';

const ProfilePage = ({ addProductSubmit }) => {
  const [name, setName] = useState('');
  const [userID, setUserId] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isAdmin, setIsAdmin] = useState('');


  const navigate = useNavigate();



  console.log("isss: " + isAdmin)



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user == null || user == undefined) {
        return navigate("/login");
      }


      getId();


      
    });




  }, []);


    const submitProfile = async () => 
      {
        const userDetailsRef = doc(db, "userDetails", userID);

      await updateDoc(userDetailsRef, {
        displayName: name,
        phone: phone,
        address: address,
        isAdmin: isAdmin,
      });

      updateProfile(auth.currentUser, {
        displayName: isAdmin
      }).then(() => {
      }).catch((error) => {
      });
      
      return navigate('/')
    };

  
  const getId = async () => {
    try {


      const userDetailsRef = collection(db, "userDetails");
      const q = query(userDetailsRef, where("authEmail", "==", auth.currentUser.email));

      console.log("emmm: " + auth.currentUser.email)
      const querySnapshot = await getDocs(q);

      let docId = '';
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setName(doc.data().displayName)
        setPhone(doc.data().phone)
        setAddress(doc.data().address)
        setIsAdmin(doc.data().isAdmin)
        setUserId(doc.id);
      });

      

      return docId;
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <section className='bg-indigo-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 content-center'>
            <div className='flex justify-center'>
              <h2 className="font-extrabold text-2xl text-center text-white bg-indigo-700 rounded-xl shadow-md py-4 px-4 mb-6">Profile</h2>
            </div>


            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Profile Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='John Doe'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>


            <div className='mb-4'>
              <label className='block text-gray-700 font-bold mb-2'>
                Phone
              </label>
              <input
                type='text'
                id='phone'
                name='phone'
                className='border rounded w-full py-2 px-3 mb-2'
                placeholder='09151234567'
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='description'
                className='block text-gray-700 font-bold mb-2'
              >
                Address
              </label>
              <textarea
                id='description'
                name='description'
                className='border rounded w-full py-2 px-3'
                rows='4'
                placeholder='#12 Washington Boulevard, Nagoyta Street, Manila City, Philippines 1950'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></textarea>
            </div>



            <div className='mb-4'>
              <label
                htmlFor='type'
                className='block text-gray-700 font-bold mb-2'
              >
                Role
              </label>
              <select
                id='isAdmin'
                name='isAdmin'
                className='border rounded w-full py-2 px-3'
                required
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.value)}
              >
                <option value='Regular'>Regular User</option>
                <option value='Administrator'>Administrator</option>
              </select>
            </div>


            <div>
              <button
                className='bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
                onClick={submitProfile}
              >
                Update Profile
              </button>
            </div>
        </div>
      </div>
    </section>
  );
};
export default ProfilePage;
