import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Button from "./Buttons/Button";
import { useDayContext } from '../contexts/DayContext';
import { useContextApi } from '../contexts/AuthContext';
import DropDown from './DropDown/DropDown';

const typeOptions = [
    { categoryId: 'in', categoryName: 'In' },
    { categoryId: 'out', categoryName: 'Out' }
];

const AddExpense = ({ setExpensesCallback }) => {
    const { currentDate, setIsLoadingCallback } = useDayContext();
    const { setIsAuthenticatedCallback, setErrorCallback } = useContextApi();

    const [expense, setExpense] = useState({
        category: null,
        type: '',
        amount: '',
        time: new Date().toISOString().slice(0, 16),
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    'http://localhost:8080/api/category/categories',
                    { withCredentials: true }
                );
                
                setCategories(data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
                setErrorCallback("Failed to load categories");
            } finally {
                setLoading(false);
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

            setIsLoadingCallback(true);

            const payLoad = {
                expenseName: expense.category.categoryName,
                categoryId: expense.category.categoryId,
                type: expense.type?.categoryId,
                amount: parseFloat(expense.amount),
                addedAt: convertTimetoTimestamp(expense.time, currentDate)
            };

            const { data } = await axios.post(
                'http://localhost:8080/api/expense/addExpense',
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
            setIsLoadingCallback(false);
        }
    };

    const handleAddCategory = async (categoryName) => {
        try {
            setLoading(true);
            const { data } = await axios.post(
                'http://localhost:8080/api/category/add',
                { categoryName },
                { withCredentials: true }
            );

            setCategories(prev => [...prev, data]);
            setExpense(prev => ({ ...prev, category: data }));
        } catch (error) {
            console.error("Failed to add category:", error);
            setErrorCallback("Failed to add category");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            setLoading(true);
            await axios.delete(
                `http://localhost:8080/api/categories/${categoryId}`,
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
            setLoading(false);
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
                    <DropDown
                        options={categories}
                        selectedOption={expense.category}
                        onSelect={(category) => setExpense(prev => ({ ...prev, category }))}
                        onAddNew={handleAddCategory}
                        onDelete={handleDeleteCategory}
                        placeholder="Select Category"
                        addNewLabel="Add category"
                        loading={loading}
                        search={true}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        In/Out
                    </label>
                    <DropDown
                        options={typeOptions}
                        selectedOption={expense.type}
                        onSelect={(type) => setExpense(prev => ({ ...prev, type }))}
                        placeholder="Select Type"
                        loading={loading}
                        search={false}
                        />
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
            <Button type="primary" text="Add Expense" customStyle="w-full mt-3" onClick={handleAddExpense} />
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