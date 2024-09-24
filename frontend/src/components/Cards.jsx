import React from 'react'

const Cards = ({ id, title, imageURL, desc }) => {
    return (
        <div className='flex items-center justify-center sm:flex-none'>
            <div className='w-64 h-72 rounded-lg shadow-custom border-2 border-black p-2 group relative'>
                <div className='w-full h-full group-hover:blur-sm group-hover:backdrop-brightness-90'>
                    <div className='w-full h-2/3 rounded-lg bg-black bg-cover bg-center' style={{ backgroundImage: `url(${imageURL !== null ? imageURL : "https://via.placeholder.com/300"})` }}></div>
                    <div className='mt-2'>
                        <h1 className='font-semibold text-lg'>{title.substring(0, 20)}{title.length > 20 ? '...' : ''}</h1>
                        <p className='text-sm'
                            dangerouslySetInnerHTML={{
                                __html: desc.length > 50 ?
                                    `${desc.substring(0, 50)}...` : desc
                            }} />
                    </div>
                </div>
                <div className="hidden group-hover:flex absolute inset-0 items-center justify-center mt-20">
                    <div className="text-center">
                        <a href={`/todos/${id}`}>
                            <button className="mx-2 px-4 py-2 bg-white border-2 border-black hover:bg-black hover:text-white shadow-custom font-semibold rounded-lg">View Details</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards
