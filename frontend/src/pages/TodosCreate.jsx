import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { Link, useNavigate } from 'react-router-dom'
import InputForm from '../components/InputForm/InputForm'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { createTodos } from '../redux/Action/todosAction';
import { toast } from 'react-toastify';

const TodosCreate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { isSuccess, isError, message } = useSelector(state => state.todos)
    const [input, setInput] = useState({
        title: '',
        status: null,
    })
    const [file, setFile] = useState({
        image: null,
        document: null
    })
    const [desc, setDesc] = useState('')

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {
        setInput((prevInput) => ({
            ...prevInput,
            status: e.target.value === 'true' ? true : false
        }))
    }

    const handleFile = (e) => {
        const selectedFile = e.target.files[0]
        setFile({
            ...file,
            [e.target.name]: selectedFile
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('title', input.title)
        formData.append('status', input.status)
        formData.append('image', file.image)
        formData.append('document', file.document)
        formData.append('desc', desc)

        const data = {
            token: user.token,
            formData
        }
        dispatch(createTodos(data))
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Success create todos')
            navigate('/todos')
        } else if (isError) {
            toast.error(message)
        }
    }, [isSuccess, isError, message, navigate])
    return (
        <section className='container min-h-screen'>
            <Link to={'/todos'}>
                <div className='flex gap-2 mb-5 group underline-hover cursor-pointer relative sm:hover:font-bold w-full lg:w-[20%] xl:w-[18%]'>
                    <IoIosArrowRoundBack className='text-3xl group-hover:rotate-90 transition ease-in-out duration-200' />
                    <h1 className='text-sm font-bold self-center'>Back to previous page</h1>
                </div>
            </Link>

            <div className='mb-5 mt-10'>
                <h1 className='font-semibold text-3xl'>Create Your Todos</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <InputForm
                        label="Todo Title"
                        name="title"
                        id="title"
                        type="text"
                        placeholder="BLP Skill Test"
                        value={input.title}
                        onChange={handleInput}
                    />
                    <div className='mb-6'>
                        <label htmlFor="status" className='block text-sm font-bold text-slate-600 mb-2'>Status</label>
                        <select name="status" id="status" value={input.status} onChange={handleSelect} className='text-sm border border-primary rounded w-full py-2 px-3 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent'>
                            <option value="">Choose Status Todos</option>
                            <option value="true">Selesai</option>
                            <option value="false">Belum Selesai</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="image" className='block text-sm font-bold text-slate-600 mb-2'>Image Attachment</label>
                        <input required type="file" id="image" name="image" onChange={handleFile} className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary' />
                    </div>
                    <div>
                        <label htmlFor="document" className='block text-sm font-bold text-slate-600 mb-2'>Document Attachment</label>
                        <input required type="file" id="document" name="document" onChange={handleFile} className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary' />
                    </div>
                </div>
                <div className='mb-3 sm:col-span-2 lg:col-span-3 mt-6'>
                    <label htmlFor="desc" className='block text-sm font-bold text-slate-600 mb-2'>Description</label>
                    <ReactQuill
                        theme="snow"
                        placeholder="You can write a description of the internship created..."
                        value={desc}
                        onChange={setDesc}
                    />
                </div>

                <div className='flex justify-center xl:justify-end gap-3 mt-10'>
                    <a href={"/todos"}>
                        <div className='border-2 border-secondary px-4 py-1 min-h-10 rounded-md font-semibold hover:bg-black hover:text-white shadow-custom'>Cancel</div>
                    </a>
                    <button className='bg-secondary text-white px-4 py-1 min-h-10 rounded-md font-semibold shadow-custom'>Submit</button>
                </div>
            </form>
        </section>
    )
}

export default TodosCreate
