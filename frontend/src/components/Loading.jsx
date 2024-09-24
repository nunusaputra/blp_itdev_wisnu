import React from 'react'
import { HashLoader } from 'react-spinners'

const Loading = () => {
    return (
        <div className="col-span-full mx-auto">
            <HashLoader size={50} color='#ce231c' />
        </div>
    )
}

export default Loading
