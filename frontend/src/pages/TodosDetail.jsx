import { DocumentIcon, PhotoIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'
import { RiPencilFill } from 'react-icons/ri'
import { FaTrashAlt } from 'react-icons/fa'
import 'react-quill/dist/quill.snow.css';
import ModalDelete from '../components/ModalDelete'
import { useDispatch, useSelector } from 'react-redux'

const TodosDetail = () => {
    const { id } = useParams()
    const [del, setDel] = useState(false)
    const { user } = useSelector(state => state.auth)
    const { todos, isSuccess, isError, message } = useSelector(state => state.todos)

    const handleDel = () => setDel(true)
    const handleCloseDel = () => setDel(false)


    return (
        <>
            <section className='container min-h-screen'>
                <Link to={'/todos'}>
                    <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-full lg:w-[25%] xl:w-[18%]'>
                        <IoIosArrowRoundBack className='text-3xl group-hover:rotate-90 transition ease-in-out duration-200' />
                        <h1 className='text-sm font-bold self-center'>Back to previous page</h1>
                    </div>
                </Link>

                {/* Header Section */}
                <div className='px-2 py-2 sm:flex sm:gap-2 sm:justify-between'>
                    <div className='flex gap-2 lg:gap-6'>
                        <div className='w-20 bg-white drop-shadow-md rounded-lg flex lg:w-[150px] lg:h-[150px] px-2 overflow-hidden'>
                            <img src={todos.User.profileURL === null ? "https://via.placeholder.com/150" : todos.User.profileURL} alt={todos.User.name} className='self-center' />
                        </div>
                        <div className='flex flex-col self-center'>
                            <h1 className='text-lg font-bold lg:text-3xl xl:mb-3'>{todos.title}</h1>
                            <h1 className='text-lg font-semibold lg:text-xl'>{todos.User.name}</h1>
                            <h2 className='text-sm lg:text-md'>{todos.User.email}</h2>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 sm:self-center'>
                        <div className={`px-4 py-2 ${todos.status ? 'bg-blue-500' : 'bg-red-500'} text-white rounded-lg text-center font-semibold`}>
                            {todos.status ? 'Selesai' : 'Belum Selesai'}
                        </div>

                        <div className='flex justify-end gap-2'>
                            <a href={`/todos/update/${id}`}>
                                <div className='w-6 h-6 rounded-md border border-secondary text-secondary flex items-center cursor-pointer hover:bg-secondary hover:text-white' >
                                    <RiPencilFill className='text-sm mx-auto' />
                                </div>
                            </a>
                            <div className='border-r-2 border-black'></div>
                            <div className='w-6 h-6 rounded-md bg-third text-white flex items-center cursor-pointer'
                                onClick={handleDel}
                            >
                                <FaTrashAlt className='text-sm mx-auto' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='lg:grid lg:gap-4 w-full lg:grid-cols-3'>
                    {/* Sidebar Section */}
                    <div className='mt-3 min-h-32 md:col-start-2 lg:col-start-3 border-2 border-black p-2 rounded-lg shadow-custom'>
                        <div className='flex gap-2'>
                            <PhotoIcon className='w-8 h-8' />
                            <h1 className='font-semibold self-center'>Image Attachment</h1>
                        </div>
                        <div className='mt-2 w-full h-56 bg-black rounded-lg bg-cover bg-center' style={{ backgroundImage: `url(${todos.imageURL !== null ? todos.imageURL : "https://via.placeholder.com/150"})` }}></div>
                    </div>

                    <div className='mt-3 min-h-32 md:col-start-2 lg:col-start-3 border-2 border-black p-2 rounded-lg shadow-custom'>
                        <div className='flex gap-2 mb-2'>
                            <DocumentIcon className='w-8 h-8' />
                            <h1 className='font-semibold self-center'>File Attachment</h1>
                        </div>
                        <iframe src={todos.documentURL !== null ? todos.documentURL : "No File"} width={"100%"} height={"200px"}></iframe>
                    </div>

                    {/* Description Section */}
                    <div className='mt-5 min-h-32 px-2 py-2 md:col-start-1 row-span-2 md:row-start-1 lg:col-span-2 md:mt-3 border-2 border-black shadow-custom rounded-sm'>
                        <div className='mt-3 text-sm' dangerouslySetInnerHTML={{ __html: todos.desc }} />
                    </div>
                </div>

                <ModalDelete open={del} close={handleCloseDel} />
            </section>
        </>
    )
}

export default TodosDetail
