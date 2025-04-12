import React from 'react';
import { FaArrowDown, FaArrowUp, FaCoins } from 'react-icons/fa';

const DaySummary = ({ income, expense }) => {
  return (
    <div className="w-full h-12 flex items-center justify-between rounded-lg max-w-md mx-auto">
      <div className="flex-1 flex items-center justify-center gap-2 text-green-600 font-semibold bg-green-100 py-2 rounded-l-lg">
        <FaArrowDown className="transform -rotate-45" /> {income}
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 text-red-600 font-semibold bg-red-100 py-2">
        <FaArrowUp className="transform -rotate-45" /> {expense}
      </div>
      <div className="flex-1 flex items-center justify-center gap-2 text-yellow-600 font-semibold bg-yellow-100 py-2 rounded-r-lg">
        <FaCoins /> {income - expense}
      </div>
    </div>
  );
};

export default DaySummary;
