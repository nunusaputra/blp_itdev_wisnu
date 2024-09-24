import React from 'react'
import AuthLayouts from '../layouts/AuthLayouts'
import { Link } from 'react-router-dom'
import FormLogin from '../fragments/FormLogin'

const Login = () => {
    return (
        <>
            <nav className='bg-white px-6 lg:px-24 py-3 sticky top-0'>
                <Link to={"/"}>
                    <div className='text-2xl font-extrabold'>Todos App.</div>
                </Link>
            </nav>
            <AuthLayouts title="Login Todos App" type="Login">
                <FormLogin />
            </AuthLayouts>
        </>
    )
}

export default Login
