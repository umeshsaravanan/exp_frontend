import React, { useState, useEffect, useRef } from 'react';

import Button from '../Buttons/Button';

const DropDown = ({
    options,
    selectedOption,
    onSelect,
    onAddNew,
    onDelete,
    placeholder = "Select an option",
    loading = false,
    search
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    const filteredOptions = options.filter(option =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className="cursor-pointer mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#029688] focus:border-[#029688] sm:text-sm flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="truncate">
                    {selectedOption?.name || placeholder}
                </span>
                <svg
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>

            {isOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-40 overflow-auto">
                    {search && <div className="px-3 py-2 border-b">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-2 py-1 border rounded"
                            placeholder="Search..."
                            autoFocus
                        />
                    </div>}
                    <ul className="py-1">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.id}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                                onClick={() => {
                                    onSelect(option);
                                    setIsOpen(false);
                                    setSearchTerm('');
                                }}
                            >
                                <span>{option.name}</span>
                                {onDelete && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDelete(option.id);
                                        }}
                                        className="text-red-500 hover:text-red-700"
                                        disabled={loading}
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                    </button>
                                )}
                            </li>
                        ))}
                        {searchTerm && !options.some(opt => opt.name.toLowerCase() === searchTerm.toLowerCase()) && onAddNew && (
                            <li className="px-3 py-2 hover:bg-gray-100">
                                <div className="flex items-center">
                                    <span className="font-medium">{searchTerm}</span>
                                    <Button
                                        type="secondary"
                                        text="Add"
                                        onClick={() => {
                                            onAddNew(searchTerm);
                                            setIsOpen(false);
                                            setSearchTerm('');
                                        }}
                                        customStyle="ml-auto px-2 py-1 text-sm"
                                        disabled={loading}
                                    />
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDown;