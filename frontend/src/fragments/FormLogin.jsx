import React, { useEffect, useRef, useState } from 'react'
import InputForm from '../components/InputForm/InputForm'
import InputPassword from '../components/InputForm/InputPassword'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../redux/Action/authAction'
import { toast } from 'react-toastify'
import { reset } from '../redux/Slice/authSlice'
import { HashLoader } from 'react-spinners'

const FormLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isSuccess, isError, message, isLoading } = useSelector(state => state.auth)
    const [input, setInput] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            email: input.email,
            password: input.password
        }

        dispatch(login(data))
    }

    useEffect(() => {
        if (isSuccess) {
            navigate('/todos')
            toast.success("Login Success")
        } else if (isError) {
            toast.error(message)
            dispatch(reset())
        }
    }, [isSuccess, isError, message, navigate, dispatch])

    const emailRef = useRef(null)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    return (
        <form onSubmit={handleSubmit}>
            <InputForm
                label="Email"
                type="email"
                name="email"
                id="email"
                placeholder="jhondoe@example.com"
                ref={emailRef}
                value={input.email}
                onChange={handleInput}
            />
            <InputPassword
                label={"Password"}
                name={"password"}
                id={"password"}
                margin={"mt-6 mb-6"}
                value={input.password}
                onChange={handleInput}
            />
            {isLoading ? (
                <div className='relative group'>
                    <button disabled className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold group-hover:cursor-not-allowed'>
                        {isLoading ? <HashLoader size={25} color='#fff' /> : "Login"}
                    </button>
                    <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md">
                        Login Process
                    </span>
                </div>
            ) : (
                <button className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold'>
                    Login
                </button>
            )}
        </form>
    )
}

export default FormLogin
