import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from "./Buttons/Button";
import { useDayContext } from '../contexts/DayContext';
import { useContextApi } from '../contexts/AuthContext';
import DropDown from './DropDown/DropDown';
import RadioButton from './Buttons/RadioButton';

const typeOptions = [
    { id: 'in', name: 'In' },
    { id: 'out', name: 'Out' }
];

const AddExpense = ({ setExpensesCallback }) => {
    const { currentDate } = useDayContext();
    const { setIsAuthenticatedCallback, setErrorCallback } = useContextApi();

    const [expense, setExpense] = useState({
        category: null,
        type: '',
        amount: '',
        time: new Date().toISOString().slice(0, 16),
    });

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // setIsLoading(true);
                const { data } = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/category/categories`,
                    { withCredentials: true }
                );

                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setErrorCallback("Failed to load categories");
            } finally {
                // setIsLoading(false);
            }
        };

        fetchCategories();

        const currentTime = new Date();
        const formattedTime = currentTime.toTimeString().slice(0, 5);
        setExpense((prev) => ({ ...prev, time: formattedTime }));

        //eslint-disable-next-line
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddExpense = async () => {
        try {
            if (!expense.category || !expense.type || !expense.amount) {
                setErrorCallback("Please fill all fields");
                return;
            }

            setIsLoading(true);

            const payLoad = {
                expenseName: expense.category.name,
                categoryId: expense.category.id,
                type: expense.type,
                amount: parseFloat(expense.amount),
                addedAt: convertTimetoTimestamp(expense.time, currentDate)
            };

            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/expense/addExpense`,
                payLoad,
                { withCredentials: true }
            );

            setExpensesCallback(data);

            setExpense({
                category: null,
                type: '',
                amount: '',
                time: new Date().toTimeString().slice(0, 5),
            });
        } catch (error) {
            setIsAuthenticatedCallback(false);
            setErrorCallback("UnAuthorized");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddCategory = async (categoryName) => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/category/add`,
                { name: categoryName },
                { withCredentials: true }
            );

            setCategories(prev => [...prev, data]);
            setExpense(prev => ({ ...prev, category: data }));
        } catch (error) {
            console.error("Failed to add category:", error);
            setErrorCallback("Failed to add category");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            setIsLoading(true);
            await axios.delete(
                `${process.env.REACT_APP_BACKEND_URL}/api/category/delete/${categoryId}`,
                { withCredentials: true }
            );

            setCategories(prev => prev.filter(cat => cat.id !== categoryId));

            if (expense.category?.id === categoryId) {
                setExpense(prev => ({ ...prev, category: null }));
            }
        } catch (error) {
            console.error("Failed to delete category:", error);
            setErrorCallback("Failed to delete category");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white px-6 pb-2 rounded-lg shadow-lg max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        className="no-spinner mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <DropDown
                        options={categories}
                        selectedOption={expense.category}
                        onSelect={(category) => setExpense(prev => ({ ...prev, category }))}
                        onAddNew={handleAddCategory}
                        onDelete={handleDeleteCategory}
                        placeholder="Select Category"
                        addNewLabel="Add category"
                        // loading={isLoading}
                        search={true}
                        maxHeight={32}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <RadioButton
                    name="type"
                    options={typeOptions}
                    selectedValue={expense.type}
                    containerClass='mt-4'
                    onChange={(val) => setExpense((prev) => ({ ...prev, type: val }))}
                />

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
            <Button type="primary" text="Add Expense" customStyle="w-full mt-3" onClick={handleAddExpense} isLoading={isLoading} />
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