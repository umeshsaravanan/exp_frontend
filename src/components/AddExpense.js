import React, { useEffect, useState } from 'react';

import Button from "./Buttons/Button";
import axios from 'axios';
import { useDayContext } from '../contexts/DayContext';

const AddExpense = () => {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [time, setTime] = useState(new Date().toISOString().slice(0, 16));
    const [description, setDescription] = useState('');

    const {currentDate} = useDayContext();

    useEffect(() => {
        const currentTime = new Date();
        const hours = String(currentTime.getHours()).padStart(2, '0');
        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
        const formattedTime = `${hours}:${minutes}`;
        setTime(formattedTime);
    }, []);

    const handleAdd = () =>{
        axios.post('http://localhost:8080/api/expense/addExpense',{
            // type, time: convertTimetoTimestamp(time), category, description, currentDate
            expenseName: 'food', categoryId: 2,amount: 100.50, addedAt: convertTimetoTimestamp(time)
        }, { withCredentials: true })
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="cursor-pointer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm"
                    >
                        <option value="">Select Category</option>
                        <option value="food">Food</option>
                        <option value="outing">Outing</option>
                        <option value="tickets">Tickets</option>
                        <option value="snacks">Snacks</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="cursor-pointer mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm"
                    >
                        <option value="">Select Type</option>
                        <option value="in">In</option>
                        <option value="out">Out</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                        Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm resize-none"
                    />
                </div>
            </div>
            <Button type="primary" text="Add" customStyle="w-full mt-3" onClick={handleAdd}/>
        </div>
    );
};

export default AddExpense;

const convertTimetoTimestamp = (time) => {
    const currentDate = new Date();
    const [hours, minutes] = time.split(':').map(Number);

    const adjustedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes,
        currentDate.getSeconds(),
        currentDate.getMilliseconds()
    );

    return adjustedDate.toISOString();

    // Alternative: Return as JavaScript Date object if your ORM handles conversion
    // return adjustedDate;
};