import React, { forwardRef } from 'react'

const Input = forwardRef((props, ref) => {
    const { name, type, placeholder, value, onChange } = props
    return (
        <input
            type={type}
            name={name}
            id={name}
            placeholder={placeholder}
            ref={ref}
            className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'
            value={value}
            onChange={onChange}
        />
    )
})

export default Input
