import React, { useEffect, useState } from 'react'
import Todos from '../pages/Todos'
import Footer from '../components/Footer'
import ComplexNavbar from '../components/Navbar'
import LoadingPage from '../components/LoadingPage'

const TodosLayouts = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [isLoading])

    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className='container'>
                    <ComplexNavbar />
                    <Todos />
                    <Footer />
                </div>
            )}
        </>
    )
}

export default TodosLayouts
