import React, { createContext, useContext, useState } from 'react'

const dayContext = createContext();

export const useDayContext = () => useContext(dayContext);

const DayContext = ({ children }) => {
    const [currentDayIndex, setCurrentDayIndex] = useState(new Date().getDay());
    const [currentDate, setCurrentDate] = useState(new Date());

    const moveDay = (direction) => {
        setCurrentDayIndex((prevIndex) => {
            let newIndex = prevIndex + direction;
            if (newIndex < 0) {
                newIndex = 6;
            } else if (newIndex > 6) {
                newIndex = 0;
            }
            return newIndex;
        });

        setCurrentDate((prevDate) => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + direction);
            return newDate;
        });
    };
    return (
        <dayContext.Provider value={{currentDayIndex, currentDate,moveDay}}>
            {children}
        </dayContext.Provider>
    )
}

export default DayContext
