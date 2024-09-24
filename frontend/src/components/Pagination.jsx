import React from 'react'
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Pagination = ({ totalPost, currentPage, setCurrentPage, postPerPage }) => {
    let pages = []

    for (let i = 0; i < Math.ceil(totalPost / postPerPage); i++) {
        pages.push(i + 1)
    }
    return (
        <div className='pagination-job'>
            <FaArrowLeft className='text-lg text-secondary self-center' />
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(page)}
                    className={page === currentPage ? 'active' : ''}
                >
                    {page}
                </button>
            ))}
            <FaArrowRight className='text-lg text-secondary self-center' />
        </div>
    )
}

export default Pagination
