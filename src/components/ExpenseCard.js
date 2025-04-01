import React, { useState } from 'react';

const ExpenseCard = ({ toDelete, toEdit, expenseName, amount, type }) => {
    // State to track if the long press occurred
    const [longPressed, setLongPressed] = useState(false);
    const [pressTimer, setPressTimer] = useState(null);

    // Duration for long press (in milliseconds)
    const LONG_PRESS_DURATION = 1000;

    // Handle mouse down event (starts the long press timer)
    const handleMouseDown = () => {
        const timer = setTimeout(() => {
            setLongPressed(true); // After 1 second, mark as long pressed
        }, LONG_PRESS_DURATION);
        setPressTimer(timer);
    };

    // Handle mouse up event (clears the long press timer if the press is released early)
    const handleMouseUp = () => {
        clearTimeout(pressTimer);
    };

    // Handle touch start event (for mobile devices)
    const handleTouchStart = () => {
        const timer = setTimeout(() => {
            setLongPressed(true);
        }, LONG_PRESS_DURATION);
        setPressTimer(timer);
    };

    // Handle touch end event
    const handleTouchEnd = () => {
        clearTimeout(pressTimer);
    };

    return (
        <div
            className="shadow-lg rounded-lg max-w-md p-4 m-2 flex justify-between items-center text-black"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <h3 className="text-lg font-semibold">{expenseName}</h3>

            <p className={`text-xl font-bold ${type === "in" ? 'text-green-500' : 'text-red-600'}`}>{`${type === "in" ? '+ ' : '- '}${amount}`}</p>

            {/* Show Edit/Delete buttons only if longPressed is true */}
            {(toDelete || toEdit) && longPressed && (
                <div className="flex gap-2">
                    {toEdit && (
                        <button className="text-[#256a63] hover:bg-[#f3f3f3] p-2 rounded-full cursor-pointer">
                            Edit
                        </button>
                    )}
                    {toDelete && (
                        <button className="text-red-500 hover:bg-[#f3f3f3] p-2 rounded-full cursor-pointer">
                            Delete
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ExpenseCard;
