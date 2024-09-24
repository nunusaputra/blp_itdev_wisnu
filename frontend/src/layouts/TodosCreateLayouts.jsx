import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import ComplexNavbar from '../components/Navbar'
import TodosCreate from '../pages/TodosCreate'
import LoadingPage from '../components/LoadingPage'

const TodosCreateLayouts = () => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        }, [isLoading])
    })
    return (
        <>
            {isLoading ? (
                <LoadingPage />
            ) : (
                <div className='container'>
                    <ComplexNavbar />
                    <TodosCreate />
                    <Footer />
                </div>
            )}
        </>
    )
}

export default TodosCreateLayouts
