import React, { useEffect, useRef, useState } from 'react'
import InputForm from '../components/InputForm/InputForm'
import InputPassword from '../components/InputForm/InputPassword'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register } from '../redux/Action/authAction'
import { toast } from 'react-toastify'
import { reset } from '../redux/Slice/authSlice'
import { HashLoader } from 'react-spinners'


const FormRegister = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoading, isSuccess, isError, message } = useSelector(state => state.auth)
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        confPassword: "",
    })
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)

    const handleImage = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);

        // Preview image before upload
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(selectedImage);
    }

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("email", input.email)
        formData.append("password", input.password)
        formData.append("confPassword", input.confPassword)
        formData.append("profile_pict", image)

        dispatch(register(formData))
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/login")
            toast.success(message)
        } else if (isError) {
            toast.error(message)
        }
        dispatch(reset())
    }, [isSuccess, isError, message, navigate, dispatch])

    const usernameRef = useRef(null)

    useEffect(() => {
        usernameRef.current.focus()
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <InputForm
                    size='mb-3'
                    label="Full Name"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Jhon Doe"
                    ref={usernameRef}
                    value={input.name}
                    onChange={handleInput}
                />
                <InputForm
                    size='mb-3'
                    label="Email"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="jhondoe@example.com"
                    value={input.email}
                    onChange={handleInput}
                />
                <InputPassword
                    label={"Password"}
                    name={"password"}
                    id={"password"}
                    margin={"mb-3"}
                    value={input.password}
                    onChange={handleInput}
                />
                <InputPassword
                    label={"Confirm Password"}
                    name={"confPassword"}
                    id={"confPassword"}
                    margin={"mb-3"}
                    value={input.confPassword}
                    onChange={handleInput}
                />

                <div className='flex flex-col sm:flex-row gap-2 items-center mb-6'>
                    <div className='w-24 h-24 border border-black rounded-full bg-cover bg-top mt-1 mr-3' style={{ backgroundImage: `url(${preview ? preview : "https://via.placeholder.com/150"})` }}></div>
                    <label for="doc" className="w-full sm:w-[30%] md:w-[40%] lg:w-[30%] xl:w-[20%] flex items-center p-2 gap-3 rounded-lg border-2 border-secondary cursor-pointer text-secondary hover:bg-black hover:text-white">
                        <h4 className="text-base font-semibold self-center mx-auto">Upload</h4>
                        <input type="file" id="doc" name="doc" accept="image/png, image/jpg, image/jpeg" hidden onChange={handleImage} />
                    </label>
                </div>

                {isLoading ? (
                    <div className='relative group'>
                        <button disabled className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold group-hover:cursor-not-allowed'>
                            {isLoading ? <HashLoader size={25} color='#fff' /> : "Register"}
                        </button>
                        <span className="invisible group-hover:visible absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-2 bg-gray-700 text-white text-xs rounded-md">
                            Register Process
                        </span>
                    </div>
                ) : (
                    <button className='bg-secondary text-white w-full px-4 py-1 h-10 rounded-md font-semibold'>
                        Register
                    </button>
                )}
            </form>
        </div>
    )
}

export default FormRegister
