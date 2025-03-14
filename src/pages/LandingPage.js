import React, { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const menu = ["Manage Expense", "Family", "Trip"];

    useEffect(() =>{
        axios.get('http://localhost:8080/api/dummy',{ withCredentials: true });
    },[])

    return (
        <div className="flex justify-center items-center min-h-screen p-2 sm:p-0 bg-gradient-to-br from-[#256a63] to-[#029688]">
            <div className="flex flex-col space-y-4">  
                {menu.map((type, index) => {
                    return (
                        <Link to={`/${type.toLowerCase()}`} key={index}>
                            <div
                                className="p-4 w-[80vw] sm:w-[50vw] border-2 border-white text-white bg-[#029688] rounded-lg shadow-md hover:bg-[#028777] hover:shadow-2xl cursor-pointer transition-all ease-in-out duration-300"
                            >
                                <p className="text-center text-xl">{type}</p> 
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}

export default LandingPage
