import React from 'react'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function Block (props) {
    return <div className='BlockDashboard'>
        <div className='shadow-1'>
            <img src={props.img} alt='imageProject'/>
            <h1>{ props.value }</h1>
            <h1>{ props.title }</h1>
        </div>
    </div>
}

function Dashboard () {
    return (
        <div className='Dashboard'>
            <Block
                img={ prefix + '/iron.png'}
                title='Visiteur'
                value={100}
            />
            <Block
                img={ prefix + '/iron.png'}
                title='Visiteur'
                value={100}
            />
            <Block
                img={ prefix + '/iron.png'}
                title='Visiteur'
                value={100}
            />
            <Block
                img={ prefix + '/iron.png'}
                title='Visiteur'
                value={100}
            />
        </div>
    )
}

export default Dashboard
