import React from 'react'

const RadioButton = ({ name, options, selectedValue, onChange, containerClass = "" }) => {
    return (
        <div className={`flex gap-4 justify-center ${containerClass}`}>
            {options.map((option) => (
                <label key={option.id} className="flex items-center gap-2">
                    <input
                        type="radio"
                        name={name}
                        value={option.id}
                        checked={selectedValue === option.id}
                        onChange={() => onChange(option.id)} className={`cursor-pointer ${option.name === "In" ? 'accent-[#256a63]' : 'accent-red-500'
                            }`}
                    />
                    <span>{option.name}</span>
                </label>
            ))}
        </div>
    );
}

export default RadioButton;
