import axios from 'axios';
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiFolder, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import ToggleButton from '../components/Buttons/ToggleButton';
import { useContextApi } from '../contexts/AuthContext';

const ProfilePage = () => {
    const { user } = useContextApi();
    const navigate = useNavigate();

    const [showSettings, setShowSettings] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = (e) => {
        e.stopPropagation();
        setDarkMode(!darkMode);
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/logout`, null, { withCredentials: true });
            if (response.status === 200) navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-md w-full mx-auto p-6 bg-white rounded-2xl shadow-lg flex flex-col items-center justify-between h-[100vh]">
            <div className="flex items-center justify-start gap-3 w-full h-36 p-4 rounded-3xl bg-[#256a63] text-white">
                <FaUserCircle size={80} />
                <div className="flex flex-col items-center justify-start gap-2 text-sm sm:text-base">
                    <h2 className="w-full text-start text-xl sm:text-2xl font-semibold">{user?.name}</h2>
                    <p className="w-full text-start">{user?.email}</p>
                </div>
            </div>

            <div className="mt-8 w-full flex flex-col gap-2 text-sm sm:text-base">
                <div
                    className="w-full flex flex-col bg-gray-300 p-4 rounded-xl cursor-pointer transition"
                >
                    <div className="flex items-center gap-2" onClick={() => setShowSettings(!showSettings)}>
                        <FiSettings size={25} />
                        <span className='text-lg font-semibold'>Settings</span>
                    </div>

                    {showSettings && (
                        <div className="flex items-center justify-between p-4">
                            <span>Dark Theme</span>
                            <ToggleButton isOn={darkMode} handleToggle={(e) =>toggleDarkMode(e)} />
                        </div>
                    )}
                </div>

                <div className="w-full flex items-center gap-2 bg-gray-300 p-4 rounded-xl transition cursor-pointer">
                    <FiFolder size={25} />
                    <span className='text-lg font-semibold'>Report</span>
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
