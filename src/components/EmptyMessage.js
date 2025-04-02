import React from 'react'
import { BiPlus } from 'react-icons/bi'

import { useDayContext } from '../contexts/DayContext';

const EmptyMessage = ({ onClick = () => { }, text }) => {
    const { isLoading } = useDayContext();

    if (isLoading)
        return;

    return (
        <div className="flex justify-center items-center flex-col gap-3 h-full w-full text-white" >
            <div className="border-2 border-white rounded-full" onClick={onClick}>
                <BiPlus size={56} />
            </div>
            <p className="font-bold text-xl">{text}</p>
        </div>
    )
}

export default EmptyMessage
