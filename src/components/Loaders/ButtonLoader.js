import React from 'react'

const ButtonLoader = () => {
    return (
        <div className='flex justify-center py-1'>
            <div className="w-4 h-4 border-2 border-[#256a63] border-t-transparent rounded-full animate-spin group-hover:border-white group-hover:border-t-transparent" />
        </div>
    );
}

export default ButtonLoader
