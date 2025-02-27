import React from 'react'

const Button = ({text, type, customStyle, onClick=() =>{}}) => {
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

  return (
    <button className={buttonClass} onClick={onClick} >{text}</button>
  )
}

export default Button
