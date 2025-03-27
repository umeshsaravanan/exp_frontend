import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import AddExpense from '../components/AddExpense';
import { useDayContext } from '../contexts/DayContext';
import ExpenseCard from '../components/ExpenseCard';


const expenses = [
    {
        expensesName: 'tea',
        amount: 20,
    },
    {
        expensesName: 'food',
        amount: 40,
    },
    {
        expensesName: 'snacks',
        amount: 60,
    },
    {
        expensesName: 'proteins',
        amount: 80,
    },
    {
        expensesName: 'outing',
        amount: 200,
    },
    {
        expensesName: 'tickets',
        amount: 500,
    },
    {
        expensesName: 'tea',
        amount: 20,
    },
    {
        expensesName: 'food',
        amount: 40,
    },
    {
        expensesName: 'snacks',
        amount: 60,
    },
    {
        expensesName: 'proteins',
        amount: 80,
    },
    {
        expensesName: 'outing',
        amount: 200,
    },
    {
        expensesName: 'tickets',
        amount: 500,
    },
    {
        expensesName: 'tea',
        amount: 20,
    },
    {
        expensesName: 'food',
        amount: 40,
    },
    {
        expensesName: 'snacks',
        amount: 60,
    },
    {
        expensesName: 'proteins',
        amount: 80,
    },
    {
        expensesName: 'outing',
        amount: 200,
    },
    {
        expensesName: 'tickets',
        amount: 500,
    },
    {
        expensesName: 'tea',
        amount: 20,
    },
    {
        expensesName: 'food',
        amount: 40,
    },
    {
        expensesName: 'snacks',
        amount: 60,
    },
    {
        expensesName: 'proteins',
        amount: 80,
    },
    {
        expensesName: 'outing',
        amount: 200,
    },
    {
        expensesName: 'tickets',
        amount: 500,
    }
]

const ManageExpense = () => {
    const { currentDate, currentDayIndex, moveDay } = useDayContext();

    const [addClick, setAddClick] = useState(false);

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIndex = new Date().getDay();
    const todayDate = new Date().toLocaleDateString();

    const isToday = currentDayIndex === todayIndex && currentDate.toLocaleDateString() === todayDate;

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="h-screen min-h-screen sm:p-0 bg-gradient-to-br from-[#256a63] to-[#029688]">
            <div className="h-full flex flex-col">
                {/* Date Header */}
                <div className="flex justify-center items-center">
                    <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                        <h2 className="text-center text-lg font-medium">{formattedDate}</h2>

                        <div className="flex justify-between items-center mt-4">
                            <span>
                                <FaChevronLeft
                                    size={30}
                                    className="bg-[#f3f3f3] p-2 rounded-full cursor-pointer hover:bg-[#d1d1d1] transition-colors"
                                    onClick={() => moveDay(-1)}
                                />
                            </span>
                            <h1 className="text-center text-xl font-semibold">
                                {isToday
                                    ? `${daysOfWeek[currentDayIndex]} (Today)`
                                    : daysOfWeek[currentDayIndex]}
                            </h1>
                            <span>
                                <FaChevronRight
                                    size={30}
                                    className={`bg-[#f3f3f3] p-2 rounded-full cursor-pointer hover:bg-[#d1d1d1] transition-colors ${isToday ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => !isToday && moveDay(1)}
                                />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Expense List */}
                <div className="flex-1 overflow-auto w-full max-w-md mx-auto">
                    {expenses.map((expense) => (
                        <ExpenseCard key={expense.expensesName} expenseName={expense.expensesName} amount={expense.amount} />
                    ))}
                </div>

                <div className="flex justify-center items-center relative"
                    onClick={() => setAddClick(true)}>
                    <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                        <div className="flex gap-3 justify-between">
                            <h3 className={`font-bold ${addClick ? '' : 'w-full text-center'}`}>Add Your Expense</h3>
                            {addClick && (
                                <span className="text-white bg-black rounded-full p-1">
                                    <FaTimes size={20} onClick={(e) => { e.stopPropagation(); setAddClick(false); }} className="cursor-pointer" />
                                </span>
                            )}
                        </div>
                        {addClick && <AddExpense />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageExpense;
