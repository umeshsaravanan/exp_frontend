import axios from 'axios';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const username = 'John Doe';
    const email = 'john.doe@example.com';
    const navigate = useNavigate();

    const handleLogout = async() =>{
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, null, { withCredentials: true });

            if (response.status === 200)
                navigate("/login"); 
        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-between h-[70vh]">
            <div className="flex items-center justify-between w-full h-36 p-4 rounded-3xl bg-[#256a63] text-white">
                <FaUserCircle size={80} className="mb-4" />
                <div className='flex flex-col gap-3'>
                    <h2 className="text-2xl font-semibold">{username}</h2>
                    <p>{email}</p>
                </div>
            </div>

            <button
                className="mt-auto bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;
