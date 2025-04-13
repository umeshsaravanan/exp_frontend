import React, { useState, useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import AddExpense from '../components/AddExpense';
import { useDayContext } from '../contexts/DayContext';
import ExpenseCard from '../components/ExpenseCard';
import axios from 'axios';
import EmptyMessage from '../components/EmptyMessage';
import DaySummary from '../components/DaySummary';
import { useContextApi } from '../contexts/AuthContext';
import Loader from '../components/Loaders/Loader';
import BottomMenu from '../components/BottomMenu';

const ManageExpense = () => {
    const { currentDate, currentDayIndex, moveDay, isLoading, setIsLoadingCallback } = useDayContext();
    const { setIsAuthenticatedCallback, setErrorCallback } = useContextApi();

    const [addClick, setAddClick] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [daySummary, setDaySummary] = useState({ income: 0, expense: 0 });

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const todayIndex = new Date().getDay();
    const todayDate = new Date().toLocaleDateString();

    const isToday = currentDayIndex === todayIndex && currentDate.toLocaleDateString() === todayDate;

    const formattedDate = currentDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    useEffect(() => {
        const fetchExpenses = async () => {
            if (!currentDate) return;

            setIsLoadingCallback(true);

            try {
                const formattedDate = new Date(currentDate).toISOString().split('T')[0];
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/expense/expenses/${formattedDate}`, { withCredentials: true });
                setExpenses(response?.data || []);
                setDaySummary(calculateDaySummary(response?.data));
            } catch (error) {
                console.error(error);
                setIsAuthenticatedCallback(false);
                setErrorCallback("UnAuthorized");
            } finally {
                setIsLoadingCallback(false);
            }
        };

        setExpenses([]);
        fetchExpenses();

        //eslint-disable-next-line
    }, [currentDate]);

    const setExpensesCallback = (expense) => {
        const newExpenses = [...expenses, expense];
        setExpenses(newExpenses);
        setDaySummary(calculateDaySummary(newExpenses));
    }

    const setAddClickCallback = (addClick) =>{
        setAddClick(addClick);
    }

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

                <DaySummary income={daySummary.income} expense={daySummary.expense} />
                {/* Expense List */}
                <div className="flex-1 overflow-auto w-full max-w-md mx-auto">
                    {getExpenses(expenses, setAddClick)}
                </div>

                <div className="flex justify-center items-center relative">
                    <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
                        <div className={`flex gap-3 justify-between px-6 py-2`}>
                            <BottomMenu addClick={addClick} setAddClickCallback={setAddClickCallback} />
                            {addClick && (
                                <span className="text-white bg-black rounded-full p-1">
                                    <FaTimes size={20} onClick={(e) => { e.stopPropagation(); setAddClick(false); }} className="cursor-pointer" />
                                </span>
                            )}
                        </div>
                        {addClick && <AddExpense setExpensesCallback={setExpensesCallback} />}
                    </div>
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    );
};

export default ManageExpense;

const getExpenses = (expenses, setAddClick) => {
    return expenses.length > 0 ? expenses.map((expense) => (
        <ExpenseCard key={expense.expenseName} expenseName={expense.expenseName} amount={expense.amount} type={expense.type} />
    )) : <EmptyMessage onClick={() => setAddClick(true)} text="No Expense For the Day" />
}

const calculateDaySummary = (expenses) => {
    let income = 0;
    let expense = 0;

    for (let exp of expenses) {
        if (exp.type === "in") {
            income += exp.amount;
        } else {
            expense += exp.amount;
        }
    }

    return { income, expense };
}