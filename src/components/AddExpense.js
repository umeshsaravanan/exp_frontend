import React, { useEffect, useState } from 'react';
import Button from "./Buttons/Button";
import axios from 'axios';
import { useDayContext } from '../contexts/DayContext';
import { useContextApi } from '../contexts/AuthContext';

//options
//TODO : change this options to user specific and get from backend
const options = [
    {
        id: 2,
        name: 'food'
    },
    {
        id: 3,
        name: 'outing'
    },
    {
        id: 4,
        name: 'tickets'
    },
    {
        id: 5,
        name: 'snacks'
    }
]

const AddExpense = ({ setExpensesCallback }) => {
    const { currentDate, setIsLoadingCallback } = useDayContext();
    const { setIsAuthenticatedCallback, setErrorCallback } = useContextApi();

    const [expense, setExpense] = useState({
        category: '',
        type: '',
        amount: '',
        time: new Date().toISOString().slice(0, 16),
    });

    useEffect(() => {
        const currentTime = new Date();
        const formattedTime = currentTime.toTimeString().slice(0, 5);
        setExpense((prev) => ({ ...prev, time: formattedTime }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setExpense((prev) => ({
            ...prev,
            [name]: name === "category" ? options.find(opt => opt.id === Number(value)) : value,
        }));
    };

    const handleAdd = async () => {
        try {
            setIsLoadingCallback(true);

            const payLoad = {
                expenseName: expense.category.name,
                categoryId: expense.category.id,
                type: expense.type,
                amount: parseFloat(expense.amount),
                addedAt: convertTimetoTimestamp(expense.time, currentDate)
            };

            const { data } = await axios.post(
                'http://localhost:8080/api/expense/addExpense',
                payLoad,
                { withCredentials: true }
            );

            setExpensesCallback(data);
        } catch (error) {
            setIsAuthenticatedCallback(false);
            setErrorCallback("UnAuthorized");
            console.error(error);
        } finally {
            setIsLoadingCallback(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount
                    </label>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={expense.category?.id || ""}
                        onChange={handleChange}
                        className="cursor-pointer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm"
                    >
                        <option value="">Select Category</option>
                        {options.map(option => (
                            <option key={option.id} value={option.id}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        In/Out
                    </label>
                    <select
                        id="type"
                        name="type"
                        value={expense.type}
                        onChange={handleChange}
                        className="cursor-pointer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm"
                    >
                        <option value="">Select Type</option>
                        <option value="in">In</option>
                        <option value="out">Out</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        name="time"
                        value={expense.time}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm"
                    />
                </div>
            </div>
            <Button type="primary" text="Add" customStyle="w-full mt-3" onClick={handleAdd} />
        </div>
    );
};

export default AddExpense;

const convertTimetoTimestamp = (time, selectedDate) => {
    const currentDate = new Date(selectedDate);
    const [hours, minutes] = time.split(':').map(Number);

    const adjustedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes,
        new Date().getSeconds(),
        new Date().getMilliseconds()
    );

    return adjustedDate.toISOString();
};
