import React from 'react'
import ButtonLoader from '../Loaders/ButtonLoader';

const Button = ({text, type, isLoading, customStyle, onClick=() =>{}, children}) => {
    let buttonClass = "px-8 py-2 font-semibold rounded-md duration-300 ";

    if(customStyle){
        buttonClass += customStyle;
    }
    if(type === "primary"){
        buttonClass += " bg-[#029688] text-white hover:bg-[#256a63] ";
    }
    if(type === "secondary"){
        buttonClass += " bg-gray-200 hover:bg-gray-400 ";
    }
    if(type === "red"){
        buttonClass += " bg-red-500 text-white hover:bg-red-600 ";
    }
    if (type === "google") {
        buttonClass += " w-full justify-center items-center flex gap-2 text-black outline outline-1 outline-black hover:bg-[#256a63] hover:text-white hover:outline-[#256a63] ";
    }

  return (
    <button className={buttonClass} onClick={onClick} >{isLoading ? <ButtonLoader/> : children || text}</button>
  )
}

export default Button
