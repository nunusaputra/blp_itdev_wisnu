import React from 'react'
import { Link } from 'react-router-dom'

const DataNotFound = ({ children = 'Not Information Found' }) => {
    return (
        <div className="sm:col-span-full items-center justify-center h-full mt-[2rem] sm:mt-[4rem] lg:mt-[7rem] mb-10">
            <div className="text-center">
                <p className="text-5xl font-semibold text-third">404</p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 lg:text-4xl xl:text-5xl">
                    {children}
                </h1>
                <p className="mt-6 text-base leading-7 text-gray-600">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link
                        to={"/"}
                        className="rounded-md border border-third px-3.5 py-2.5 text-sm font-semibold text-third hover:text-white shadow-sm hover:bg-third focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-third transition-colors ease-in duration-300"
                    >
                        Go back home
                    </Link>
                    <Link to={"/contact"} className="text-sm font-semibold text-gray-900">
                        Contact support <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DataNotFound
