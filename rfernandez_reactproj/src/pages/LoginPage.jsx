import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged  } from 'firebase/auth';
import { db, auth } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';


const LoginPage = () => {

    const [page, setPage] = useState("login");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const navigate = useNavigate();

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const signUp = async () => {


        if (email.trim() == "" || password.trim() == "" || confirmPass.trim() == "") {
            toast.warn('Please complete all fields');
        }
        else if (!email.match(isValidEmail)) {
            toast.warn('Please enter a valid email address');
        }
        else if (password != confirmPass) {
            toast.warn('Passwords do not match');

        } else if (password <= 7) {
            toast.warn('Password must have 8 or longer characters');

        }
        else {
            try {
                await createUserWithEmailAndPassword(auth, email, password)
                const userDetailsRef = collection(db, "userDetails");
                addDoc(userDetailsRef, {
                    authEmail: email,
                    displayName: email,
                    phone: "",
                    address: "",
                    isAdmin: "Regular"
                  });


                  updateProfile(auth.currentUser, {
                    displayName: "Regular"
                  }).then(() => {
                  }).catch((error) => {
                  });
                toast.success('Registration successful!');
                return navigate('/');
            } catch (error) {
                console.error(error.message.toString())
                if(error.message.toString() == "Firebase: Error (auth/email-already-in-use)." )
                toast.warn("The email you entered is already in use");
            }
        }
    };

    const signIn = async () => {

        if (email.trim() == "" || password.trim() == "") {
            toast.warn('Please complete all fields');
        } 
        else if (!email.match(isValidEmail)) {
            toast.warn('Please enter a valid email address');
        }
        else {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                toast.success("Welcome back, " + user.email + "!");
                return navigate('/');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.warn('Email or Password is incorrect');
            });

        }
        
    }

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user);
            if (user != null || user != undefined) {
                return navigate("/");
            }
          });
      }, []);


    return (
        <section className="flex flex-col items-center pt-6">
            <div className={page === "login" ? "" : "hidden"}>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign in to your account
                        </h1>
                        <div className="space-y-4 md:space-y-6">
                            <div>
                                <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="username" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <input type="submit" hidden />
                            <button type="submit" onClick={signIn} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign In</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Don't have an account yet? <a
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer" onClick={() => { setPage("signUp") }}>Sign up here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={page === "signUp" ? "" : "hidden"}>
                <div
                    className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create an
                            account
                        </h1>
                        <div className="space-y-4 md:space-y-6" method="POST">
                            <div>
                                <label for="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="username" onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
                                <input type="password" name="password" onChange={(e) => setConfirmPass(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <input type="submit" hidden />
                            <button type="submit" onClick={signUp} className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">Already have an account? <a
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500 cursor-pointer" onClick={() => { setPage("login") }}>Sign in here</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage