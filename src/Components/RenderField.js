import React from 'react'


const  RenderField = ({ input,name, label, type, meta: { touched, error, warning } }) => {
  return (
    <div>
    <label htmlFor={name}>{label}</label>
    <div>
    <input {...input}  type={type} />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
    </div>
  )
}
export default RenderField;
