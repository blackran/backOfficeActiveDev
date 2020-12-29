import React from 'react'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function NavTopBackOffice () {
    return (
        <div className='NavTopBackOffice'>
            <h1>Header</h1>
            <div className='avatar'>
                <img src={ prefix + '/me.jpg' } alt='user'/>
            </div>
        </div>
    )
}

export default NavTopBackOffice
