import React from 'react'

const ToggleButton = ({ isOn, handleToggle }) => {
    return (
        <div
            className={`w-12 h-6 border-2 border-gray-500 flex items-center rounded-full p-1 cursor-pointer transition ${isOn ? 'bg-[#256a63]' : 'bg-gray-300'
                }`}
            onClick={handleToggle}
        >
            <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${isOn ? 'translate-x-6' : 'translate-x-0'
                    }`}
            />
        </div>
    );
}


export default ToggleButton
