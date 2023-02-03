
import { userAvatar } from '../../assets'
import { useState } from 'react';


import {
    MessageOutlined,
    HeartOutlined,
    RetweetOutlined,
    FundViewOutlined,
    EllipsisOutlined


} from '@ant-design/icons';

export default function TweetCard({ tweet, image, username, name }) {

    return (
        <div className='border-2 border-gray-500 min-w-[400px] p-10 rounded-md bg-[#f3f4f4]  mx-auto mt-2'>
            <div className='header flex justify-between items-center'>
                <div className='flex gap-1'>
                    <img src={image} alt='ProfileUserAvatar' className='h-[30px] w-[30px] rounded-full object-cover ' />
                    <h2 className='text-base'>{name}</h2>
                    <h2 className='text-base'>{`@${username}`}</h2>
                    {/* <h2 className='text-base'>4h</h2> */}
                </div>

                <EllipsisOutlined style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }} />
            </div>
            <p className='my-4 text-justify'>{tweet}</p>
            <div>
                <img src={userAvatar} alt='userAvatar' className='rounded-md' />

            </div>
            <div className='flex justify-between items-center mt-5'>
                <MessageOutlined style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }} />
                <RetweetOutlined style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }} />
                <HeartOutlined style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }} />
                <FundViewOutlined style={{ fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' }} />



            </div>
        </div>
    )
}
