import React from "react";
import { BiSolidCoinStack } from "react-icons/bi";

import { useDayContext } from '../contexts/DayContext';

const Loader = () => {
    const { isLoading } = useDayContext();

    if (!isLoading) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <BiSolidCoinStack className="w-16 h-16 text-[#cc9b24] animate-spin" />
        </div>
    );
};

export default Loader;
