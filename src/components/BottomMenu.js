import React from 'react'
import { FaPlus, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BottomMenu = ({ addClick, setAddClickCallback }) => {
    return (
        <div className='flex justify-between w-full'>
            {!addClick &&
                <>
                    <div onClick={(e) => { e.stopPropagation(); setAddClickCallback(true); }} className={`font-bold flex items-center justify-center text-white w-10 h-10 bg-[#256a63] rounded-full`}>
                        <FaPlus size={20} className="cursor-pointer" />
                    </div>
                    <Link to="/profile" >
                        <FaUserCircle size={40} />
                    </Link>
                </>}
        </div>
    )
}

export default BottomMenu
