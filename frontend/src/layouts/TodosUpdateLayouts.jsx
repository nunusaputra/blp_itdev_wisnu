import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import ComplexNavbar from '../components/Navbar'
import TodosUpdate from '../pages/TodosUpdate'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTodosID } from '../redux/Action/todosAction'
import LoadingPage from '../components/LoadingPage'

const TodosUpdateLayouts = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        const data = {
            id,
            token: user.token
        }

        dispatch(getTodosID(data))
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [dispatch])
    return (
        <>
            {isLoading ? (
                <div className='flex items-center justify-center min-h-screen'>
                    <LoadingPage />
                </div>
            ) : (
                <>
                    <div className='container'>
                        <ComplexNavbar />
                        <TodosUpdate />
                        <Footer />
                    </div>
                </>
            )}
        </>
    )
}

export default TodosUpdateLayouts
