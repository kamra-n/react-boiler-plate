import Button from '../../Components/Button/Button';
import TweetCard from '../../Components/TweetCard/TweetCard';
import { Empty } from 'antd';

import {
    SearchOutlined,
    PictureOutlined,
    SmileOutlined,
    CalendarOutlined,
    PushpinOutlined,
    HomeOutlined,
    NotificationOutlined,
    MessageOutlined,
    BookOutlined,
    ProfileOutlined,
    BorderInnerOutlined
} from '@ant-design/icons';
import { Spin } from 'antd';
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addTweet, getAllTweets, getSingleUserTweets } from '../../store/TwitterSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Modal } from 'antd';






export default function Profile() {

    const data = localStorage.getItem('login')
    const [currentUser] = useState(JSON.parse(data));
    const tweetRef = useRef(null)
    const dispatch = useDispatch();
    const { isLoading, dataList } = useSelector((state) => state);

    console.log(dataList.allTweets)
    console.log('singleTweets', dataList.singleUserTweets)

    const fetchData = () => {

        dispatch(getSingleUserTweets())
            .unwrap()
            .then((data) => {
                console.log(data);
            });
    };

    /////Modal work
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const tweetHandler = (e) => {
        e.preventDefault();
        const id = new Date().getTime();
        if (tweetRef.current.value === '') {
            return toast.error('Please add All Details Correctly!');

        }
        else {
            const data = {
                id,
                name: currentUser.name,
                username: currentUser.username,
                image: currentUser.imageUrl,
                uid: currentUser.uid,
                email: currentUser.email,
                tweet: tweetRef.current.value,
            }
            dispatch(addTweet(data)).unwrap()
                .then((data) => {
                    console.log(data);
                });
            dispatch(getAllTweets())
            dispatch(singleUserTweets())
            tweetRef.current.value = ''

        }


    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div className='lg:px-24 max-w-[1512px] mx-auto grid grid-cols-1 lg:grid lg:grid-cols-[200px,1fr,250px] gap-1 mt-4 relative'>
                <div className='h-screen  flex-col  justify-around gap-4 fixed top-0 left-40 drop-shadow-lg hidden lg:flex'>
                    <div className='flex cursor-pointer items-center gap-3'>
                        <Link to='/'>  <HomeOutlined style={{ fontSize: "25px" }} /> <span className='text-xl font-semibold'>Home</span></Link>
                    </div>
                    <div className='flex cursor-pointer items-center gap-3'>
                        <NotificationOutlined style={{ fontSize: "25px" }} /> <span className='text-xl font-semibold'>Notification</span>
                    </div>

                    <div className='flex cursor-pointer  items-center gap-3'>
                        <MessageOutlined style={{ fontSize: "25px" }} /> <span className='text-xl font-semibold'>Message</span>
                    </div>

                    <div className='flex cursor-pointer items-center gap-3'>
                        <BookOutlined style={{ fontSize: "25px" }} /> <span className='text-xl font-semibold'>Bookmarks</span>
                    </div>

                    <div className='flex cursor-pointer items-center gap-3'>
                        <Link to='/profile'><ProfileOutlined style={{ fontSize: "25px" }} /> <span className='text-xl font-semibold'>Profile</span></Link>
                    </div>
                    <Button className='!h-[30px] !w-[200px] !px-9 flex cursor-pointer justify-center items-center bg-blue-500 text-white font-bold'>Tweet</Button>
                </div>
                <div className='h-screen grid grid-cols-1 justify-center items-center lg:px-4 mx-auto lg:ml-80'>
                    <div className='border-2 border-gray-500 w-full mx-auto min-w-[400px] p-10 rounded-md'>
                        <form className='header flex flex-col gap-6' onSubmit={tweetHandler}>
                            <div className='flex items-center gap-4'>
                                <img src={currentUser?.imageUrl} alt='ProfileUserAvatar' className='h-[30px] w-[30px] rounded-full object-cover ' />
                                <select className='border-2 rounded-xl px-2 py-1 text-blue-500 semi-bold'>
                                    <option>Every one</option>
                                    <option>Twitter Circle</option>
                                </select>
                            </div>
                            <input placeholder='Whats happenings' className='focus:outline-none' ref={tweetRef} />
                            <span className='text-blue-500 font-semibold '>Everyone Can Reply</span>
                            <div className='flex justify-between items-center'>
                                <div className='flex gap-10'>
                                    <PictureOutlined style={{ color: '#3b82f6', fontSize: '20px' }} />
                                    <SmileOutlined style={{ color: '#3b82f6', fontSize: '20px' }} />
                                    <CalendarOutlined style={{ color: '#3b82f6', fontSize: '20px' }} />
                                    <PushpinOutlined style={{ color: '#3b82f6', fontSize: '20px' }} />
                                </div>
                                <Button className='flex justify-center items-center !w-[70px] !h-[40px] text-white bg-blue-500 font-bold !p-2'>Tweet</Button>
                            </div>
                        </form>
                    </div>
                    {isLoading ?
                        <div className='lg:ml-80'>

                            <Spin size="large" style={{ height: '100vh', margin: '2rem 0', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
                        </div>
                        : dataList?.singleUserTweets?.length === 0 ? <div className='lg:ml-52'><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div> :
                            dataList?.singleUserTweets?.map((data, index) => {
                                return (
                                    <TweetCard key={index} {...data} />
                                )
                            })}

                    <div className='w-[95%] flex justify-around items-center px-4 rounded-md h-20 bg-white fixed bottom-0 lg:hidden'>
                        <Link to='/'>  <HomeOutlined style={{ fontSize: "30px" }} /> </Link>
                        <Link to='/profile'><ProfileOutlined style={{ fontSize: "30px" }} /> </Link>
                        <BorderInnerOutlined style={{ fontSize: "30px" }} onClick={showModal} />
                        <NotificationOutlined style={{ fontSize: "30px" }} />
                        <MessageOutlined style={{ fontSize: "30px" }} />

                    </div>
                </div>
                <div className='h-screen px-3 fixed top-0 right-[5rem] drop-shadow-lg hidden lg:block'>
                    <div className='flex cursor-pointer items-center border-2 rounded-lg mt-2 bg-[#eff3f4]'>
                        <SearchOutlined style={{ paddingRight: '.4rem', paddingLeft: '.4rem' }} />
                        <input type='text' placeholder='Search ' className='focus:outline-none outline-none bg-[#eff3f4] w-[98%] py-1 px-5' />
                    </div>
                    <div className='mt-2 bg-[#eff3f4] rounded-lg'>
                        <h3 className='font-bold text-2xl'>Trends For You</h3>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                onOk={tweetHandler}
                onCancel={handleCancel}
                footer={[

                ]}>
                <form className='flex flex-col justify-center items-start mx-auto' onSubmit={tweetHandler}>
                    <label htmlFor='tweet' className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-gray-700">Add Tweet</label>
                    <input type='text' id='tweet' className='w-[95%] lg:w-[350px] my-2 rounded-sm border-2 py-4 placeholder-gray-500  focus:border-[#1d9bf0] focus:outline-none focus:transition-all' ref={tweetRef} required />
                    <Button className='flex justify-center items-center bg-black text-white' key="submit">
                        Add a Tweet
                    </Button>
                </form>
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
