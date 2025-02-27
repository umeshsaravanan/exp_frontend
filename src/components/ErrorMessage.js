import React from 'react'

const ErrorMessage = ({msg, customStyle=""}) => {
  return (
    <p className={`text-red-500 text-left animate__animated animate__fadeIn ${customStyle}`}>{msg}</p>
  )
}

export default ErrorMessage
