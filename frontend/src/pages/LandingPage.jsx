import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/outline'

const LandingPage = () => {
    const [btn, setBtn] = useState(null)
    return (
        <div>
            <nav className='bg-white px-6 lg:px-24 py-3 sticky top-0'>
                <Link to={"/"}>
                    <div className='text-2xl font-extrabold'>Todos App.</div>
                </Link>
            </nav>
            <section className='flex flex-col gap-2 justify-center items-center px-6 xl:px-0 text-center'>
                <h1 className='text-4xl font-semibold tracking-wide mb-10'>Make your life easier with Todos App.</h1>
                <div className='flex flex-col md:flex-row gap-4 lg:gap-8 mb-5'>
                    <button
                        onClick={() => setBtn("login")}
                        className='w-[22rem] h-48 ring-1 ring-slate-400 rounded-lg px-6 relative hover:ring-2 
                                hover:ring-secondary hover:bg-[#f5f5f5] hover:bg-opacity-75 focus:ring-2 
                                focus:ring-secondary focus:bg-[#f5f5f5] focus:bg-opacity-75 group'
                    >
                        <div className='w-8 h-8 rounded-full border border-slate-400 absolute right-5 group-focus:bg-secondary group-focus:border-none'></div>
                        <div className='w-5 h-5 rounded-full border-2 border-slate-400 absolute top-[2.1rem] right-[1.6rem] invisible group-focus:visible group-focus:border-white'></div>
                        <BriefcaseIcon className='w-8 h-8 mt-5' />
                        <h1 className='mt-5 text-2xl font-semibold text-left'>I have already created<span className='block'>an account</span></h1>
                    </button>
                    <button
                        onClick={() => setBtn("register")}
                        className='w-[22rem] h-48 ring-1 ring-slate-400 rounded-lg px-6 relative hover:ring-2 
                        hover:ring-secondary hover:bg-[#f5f5f5] hover:bg-opacity-75 focus:ring-2 
                        focus:ring-secondary focus:bg-[#f5f5f5] focus:bg-opacity-75 group'
                    >
                        <div className='w-8 h-8 rounded-full border border-slate-400 absolute right-5 group-focus:bg-secondary group-focus:border-none'></div>
                        <div className='w-5 h-5 rounded-full border-2 border-slate-400 absolute top-[2.1rem] right-[1.6rem] invisible group-focus:visible group-focus:border-white'></div>
                        <AcademicCapIcon className='w-8 h-8 mt-5' />
                        <h1 className='mt-5 text-2xl font-semibold text-left'>I don't have an account <span className='block'>I want to register</span></h1>
                    </button>
                </div>
                {btn === null ? (
                    <button disabled className='px-4 py-2 rounded-xl bg-slate-300 font-semibold cursor-not-allowed'>Create account</button>
                ) : (
                    btn === "login" ? (
                        <Link to={'/login'}>
                            <button className='px-4 py-2 rounded-xl bg-secondary text-white font-semibold'>I want to login</button>
                        </Link>
                    ) : (
                        <Link to={'/register'}>
                            <button className='px-4 py-2 rounded-xl bg-secondary text-white font-semibold'>I want to register</button>
                        </Link>
                    )
                )}
                <p>Already have an account? <Link to={'/login'} className='text-blue-500 font-semibold'>Login</Link></p>
            </section>
        </div>
    )
}

export default LandingPage
