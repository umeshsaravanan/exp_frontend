import React from "react";
import { BiSolidCoinStack } from "react-icons/bi"; // Expense-related icon

const Loader = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="min-h-[200px]">
                <BiSolidCoinStack className="w-12 h-12 text-[#30beb0] animate-spin" />
            </div>
        </div>
    );
};

export default Loader;
