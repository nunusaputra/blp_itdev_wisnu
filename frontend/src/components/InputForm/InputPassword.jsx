import React, { useState } from 'react'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'

const InputPassword = ({ margin, value, onChange, label, name, id }) => {
    const [show, setShow] = useState(false)
    return (
        <div className={`${margin}`}>
            <label htmlFor={name} className='block text-sm font-bold text-slate-600 mb-2'>{label}</label>
            <div className='relative block'>
                <span className='sr-only'>Password</span>
                <span className='absolute inset-y-0 right-3 flex items-center pl-2 cursor-pointer' onClick={() => setShow(!show)}>
                    {show ? <IoEyeOffOutline className='w-5 h-5' /> : <IoEyeOutline className='w-5 h-5' />}
                </span>
                <input
                    type={show ? "text" : "password"}
                    name={name}
                    id={id}
                    placeholder="********"
                    value={value}
                    onChange={onChange}
                    className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent' />
            </div>
        </div>
    )
}

export default InputPassword
