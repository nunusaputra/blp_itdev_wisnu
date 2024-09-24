import React, { useEffect, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Cards from '../components/Cards'
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux'
import { fetchTodos, getTodos } from '../redux/Action/todosAction'
import Loading from '../components/Loading'
import DataNotFound from '../components/DataNotFound'
import Pagination from '../components/Pagination'
import { toast } from 'react-toastify'

const Todos = () => {
    const dispatch = useDispatch()
    const { isLoading, todos, isSuccess, isError, message } = useSelector(state => state.todos)
    const { user } = useSelector(state => state.auth)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(12)
    const [search, setSearch] = useState("")

    // Filter todos berdasarkan pencarian
    const filteredTodos = Array.isArray(todos)
        ? todos.filter(todo =>
            search.toLowerCase() === "" || todo.title.toLowerCase().includes(search.toLowerCase())
        )
        : []

    // Menghitung index untuk paginasi
    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = filteredTodos.slice(firstPostIndex, lastPostIndex)

    const handleDummy = () => {
        dispatch(fetchTodos(user.token))

        if (isSuccess) {
            toast.success("Success dummy data")
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } else if (isError) {
            toast.error(message)
        }
    }

    useEffect(() => {
        dispatch(getTodos(user.token))
    }, [dispatch])

    return (
        <main className='container min-h-screen mb-10'>
            <section className=''>
                <div className='flex flex-col gap-4 items-center justify-center'>
                    <blockquote className="text-4xl lg:text-5xl font-semibold italic text-center text-slate-900 tracking-wide leading-tight">
                        Make your life easier
                        <span className='block'>
                            with
                            <span className="before:absolute before:-inset-1 ml-2 before:-skew-y-1 before:bg-pink-500 relative inline-block">
                                <span className="relative text-white">Todos App</span>
                            </span>
                        </span>
                    </blockquote>
                    <div className='text-center lg:w-2/3'>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, optio sed obcaecati deserunt nesciunt ratione molestiae? Eius amet quas mollitia.</p>
                    </div>
                </div>
            </section>

            <section className='flex flex-col gap-3 md:flex-row justify-between'>
                <div className='mb-3 md:mb-0 md:w-[40%] lg:w-[50%] xl:w-[60%]'>
                    <label htmlFor="" className='relative block'>
                        <span className='sr-only'>Search</span>
                        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
                            <IoSearchOutline className='w-5 h-5' />
                        </span>
                        <input
                            type="text"
                            name="search"
                            placeholder="Search for anything..."
                            onChange={e => setSearch(e.target.value)}
                            className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border-2 border-black rounded-md py-2 pl-9 pr-3 shadow-custom focus:outline-none sm:text-sm' />
                    </label>
                </div>
                <div className='flex justify-center xl:justify-end gap-3'>
                    <button className='border-2 border-secondary px-4 py-1 min-h-10 rounded-md font-semibold hover:bg-black hover:text-white shadow-custom' onClick={handleDummy}>Dummy Todos</button>
                    <a href={"/todos/create"}>
                        <button className='bg-secondary text-white px-4 py-1 min-h-10 rounded-md font-semibold shadow-custom'>Create Todos</button>
                    </a>
                </div>
            </section>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                {isLoading ? (
                    <Loading />
                ) : (
                    currentPost && currentPost.length > 0 ? (
                        currentPost.map(item => (
                            <Cards key={item.id} {...item} />
                        ))
                    ) : (
                        <DataNotFound>
                            {search ? "Your search result not found" : "No Todos Available"}
                        </DataNotFound>
                    )
                )}
            </div>

            {!isLoading && (
                <Pagination
                    totalPost={filteredTodos.length} // Paginasi berdasarkan hasil pencarian
                    postPerPage={postPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            )}
        </main>
    )
}

export default Todos
