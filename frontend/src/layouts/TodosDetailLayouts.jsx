import React, { useEffect, useState } from 'react'
import TodosDetail from '../pages/TodosDetail'
import Footer from '../components/Footer'
import ComplexNavbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'
import { getTodosID } from '../redux/Action/todosAction'

const TodosDetailLayouts = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        const data = {
            id: id,
            token: user.token
        }
        dispatch(getTodosID(data))
        requestAnimationFrame(() => {
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        })
    })


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
                        <TodosDetail />
                        <Footer />
                    </div>
                </>
            )}
        </>
    )
}

export default TodosDetailLayouts
