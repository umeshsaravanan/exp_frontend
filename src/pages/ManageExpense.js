import React, { useState } from 'react'
import { FaTimes } from 'react-icons/fa';

const ManageExpense = () => {
    const [addClick, setAddClick] = useState(false);

    return (
        <div className="h-screen min-h-screen sm:p-0 bg-gradient-to-br from-[#256a63] to-[#029688]">
            <div className='flex flex-col justify-between h-full'>
                <h1>your expense</h1>
                <div className='bg-white min-h-[50px] width-full rounded-t-lg p-3 cursor-pointer' onClick={() => setAddClick(true)}>
                    <div className='flex gap-3 justify-between'>
                        <h3>add your expense</h3>
                        <FaTimes size={20} onClick={(e) => {e.stopPropagation() ;setAddClick(false)}} className='cursor-pointer'/>
                    </div>
                    {
                        addClick && (
                            <>
                                <h3>Category</h3>
                                <h3>Type</h3>
                                <h3>Time</h3>
                                <h3>Description</h3>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ManageExpense
