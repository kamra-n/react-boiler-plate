import React, { useRef, useState, useEffect } from 'react'
import { Modal } from 'antd';
import { storage } from '../../firebase.config';

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from '../../store/TwitterSlice';
import { useNavigate } from 'react-router-dom';


import Button from '../../Components/Button/Button'
import {
    googleIcon, appleIcon
} from '../../assets'

export default function Login() {
    const { is_Login,isLoading } = useSelector((state) => state);
    const navigate = useNavigate();

   


    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    //    upload file to fireStorage
    const [file, setFile] = useState('');
    const [imageUrl, setImageUrl] = useState()

    console.log('imageUrl', imageUrl)

    useEffect(() => {
        const uploadFile = () => {
            const storageRef = ref(storage, file.name);

            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed',
                (snapshot) => {

                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    console.log(error)
                },
                () => {

                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setImageUrl(downloadURL)
                    });
                }
            );

        }
        file && uploadFile();


    }, [file])



    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();

    const LoginHandler = () => {

        if (passwordRef.current.value === '' || emailRef.current.value === '') {
            emailRef.current.value === ''
            passwordRef.current.value === ''
            return toast.error('Please add All Details Correctly!');
        }
        else {
            const userLogin = {
                email: emailRef.current.value,
                password: passwordRef.current.value,

            }
            dispatch(loginUser(userLogin))
                .unwrap()
                .then((data) => {
                    console.log(data);
                });
            // if (is_Login) {
            //     navigate('/')
            // }
            is_Login ? navigate('/') : ''


        }

    }
    const SignUpHandler = () => {
        if (nameRef.current.value === '' || emailRef.current.value === '' || userNameRef.current.value === '' || passwordRef.current.value === '' && passwordRef.current.value.length < 3) {
            nameRef.current.value === ''
            emailRef.current.value === ''
            userNameRef.current.value === ''
            passwordRef.current.value === ''

            return toast.error('Please add All Details Correctly!');

        }
        else {
            const userSignUpData = {
                name: nameRef.current.value,
                email: emailRef.current.value,
                username: userNameRef.current.value,
                password: passwordRef.current.value,
                imageUrl
            }
            dispatch(registerUser(userSignUpData))
                .unwrap()
                .then((data) => {
                    console.log(data);
                });

            setOpen(false)
            nameRef.current.value === ''
            emailRef.current.value === ''
            userNameRef.current.value === ''
            passwordRef.current.value === ''

        }

    };

    const handleCancel = () => {
        setOpen(false);
    };





    return (
        <>

            <div className='h-auto max-w-[500px] flex flex-col items-center rounded-lg shadow-md border mx-auto py-8 mt-14'>
                <h1 className=' text-2xl lg:text-4xl font-bold'>Sign in to Sharing Hub</h1>
                <Button className='flex justify-center items-center gap-3 mt-8 w-[95%] mx-auto lg:w-[350px]'> <img src={googleIcon} alt='googleICon' className='h-[30px] w-[30px] object-cover hidden lg:block' /> Sign in with Google</Button>
                <Button className='flex justify-center items-center gap-3 mt-5 w-[95%] mx-auto lg:w-[350px]'> <img src={appleIcon} alt='AppleICon' className='h-[30px] w-[30px] object-cover hidden lg:block' /> Sign in with Apple</Button>
                <span className='my-2 after:content-["*"] after:ml-0.5 after:text-red-500'>Or</span>
                <input type='email' className='w-[95%] lg:w-[350px] my-2 rounded-sm border-2 py-4 placeholder-gray-500  focus:border-[#1d9bf0] focus:outline-none focus:transition-all' placeholder='Phone,Email,or userName' ref={emailRef} />
                <input type='password' className='w-[95%] lg:w-[350px] my-2 rounded-sm border-2 py-4 placeholder-gray-500  focus:border-[#1d9bf0] focus:outline-none focus:transition-all' placeholder='Enter Your Password' ref={passwordRef} />
                <Button className='flex justify-center items-center gap-3 mt-5 bg-black text-white font-bold w-[95%] mx-auto lg:w-[350px]' onClick={LoginHandler}>Next</Button>
                <Button className='flex justify-center items-center gap-3 mt-5 font-bold w-[95%] mx-auto lg:w-[350px]'> Forgot Password?</Button>
                <span className='mt-10 self-start pl-10'>Don't Have Account? <button className='text-blue-400' onClick={showModal}>Sign Up</button></span>
            </div>



            <Modal
                style={{ top: 20 }}
                open={open}
                title="Create Your Account"
                onOk={SignUpHandler}
                onCancel={handleCancel}
                footer={[
                    <Button className='flex justify-center items-center bg-black text-white' key="submit" onClick={SignUpHandler}>
                        Create an account
                    </Button>
                ]}>
                <div className='flex flex-col justify-center items-start mx-auto'>
                    <label htmlFor='name' className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">Enter Your Name</label>
                    <input type='text' id='name' className='w-[95%] lg:w-[350px] my-2 rounded-sm border-2 py-4 placeholder-gray-500  focus:border-[#1d9bf0] focus:outline-none focus:transition-all' ref={nameRef} required />
                    <label htmlFor='image' className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">Upload Your Profile</label>
                    <input type='file' id='image' className='w-[95%] lg:w-[350px] my-2 rounded-sm border-2 py-4 placeholder-gray-500  focus:border-[#1d9bf0] focus:outline-none focus:transition-all' onChange={(e) => setFile(e.target.files[0])} required />
                    <label htmlFor='email' className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">Enter Your Email</label>
                    <input type='email' id='email' className='w-[95%] lg:w-[350px] my-2 rounded-sm border-2 py-4 placeholder-gray-500  focus:border-[#1d9bf0] focus:outline-none focus:transition-all' ref={emailRef} required />
                    <label htmlFor='username' className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">Enter Your Username</label>
                    <input type='username' id='username' className='w-[95%] lg:w-[350px] my-2 rounded-sm border-2 py-4 placeholder-gray-500  focus:border-[#1d9bf0] focus:outline-none focus:transition-all' ref={userNameRef} required />
                    <label htmlFor='password' className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">Enter Your Password</label>
                    <input type='password' id='password' className='w-[95%] lg:w-[350px] my-2 rounded-sm border-2 py-4 placeholder-gray-500  focus:border-[#1d9bf0] focus:outline-none focus:transition-all' ref={passwordRef} required />

                </div>
            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />



        </>
    )
}
