import React from 'react'

const Button = ({text, type, customStyle, onClick=() =>{}, children}) => {
    let buttonClass = "px-8 py-2 font-semibold rounded-md duration-300 ";

    if(customStyle){
        buttonClass += customStyle;
    }
    if(type === "primary"){
        buttonClass += " bg-blue-500 text-white hover:bg-blue-600 ";
    }
    if(type === "secondary"){
        buttonClass += " bg-gray-200 hover:bg-gray-400 ";
    }
    if(type === "red"){
        buttonClass += " bg-red-500 text-white hover:bg-red-600 ";
    }
    if (type === "google") {
        buttonClass += " w-full justify-center items-center flex gap-2 text-black outline outline-1 outline-black hover:bg-blue-600 hover:text-white hover:outline-0 ";
    }

  return (
    <button className={buttonClass} onClick={onClick} >{text || children}</button>
  )
}

export default Button
