import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function NavTopBackOffice () {
    const router = useRouter()
    const [active, setActive] = useState('Dashboard')

    const convertiseur = (page) => {
        switch (page) {
        case 'Dashboard':
            return 'Dashboard'
        case 'Membres':
            return 'Membres'
        case 'Projets':
            return 'Projects'
        case 'ListesTech':
            return 'Listes Technologies'
        case 'TypesTech':
            return 'Types Technologies'
        default:
            return 'Dashboard'
        }
    }

    useEffect(() => {
        if (router.query.page) {
            setActive(convertiseur(router.query.page))
        }
    }, [active, router.query.page])

    return (
        <div className='NavTopBackOffice'>
            <h1>{ active }</h1>
            <div className='avatar'>
                <img src={ prefix + '/me.jpg' } alt='user'/>
            </div>
        </div>
    )
}

export default NavTopBackOffice
