import React, { forwardRef } from 'react'
import Label from './Label'
import Input from './Input'

const InputForm = forwardRef((props, ref) => {
    const { name, type, placeholder, label, size = "mb-6", style, value, onChange } = props
    return (
        <div className={`${size}`}>
            <Label htmlFor={name} styling={style}>{label}</Label>
            <Input type={type} name={name} id={name} placeholder={placeholder} ref={ref} value={value} onChange={onChange} />
        </div>
    )
})

export default InputForm
