import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import NavBackOffice from './layouts/backOffice/navBackOffice/NavBackOffice'
import NavTopBackOffice from './layouts/backOffice/navTopBackOffice/NavTopBackOffice'
import Dashboard from './layouts/backOffice/dashboard/Dashboard'
import Membres from './layouts/backOffice/membres/Membres'
import Projects from './layouts/backOffice/projects/Projects'
import ListesTech from './layouts/backOffice/listesTech/ListesTech'
import TypesTech from './layouts/backOffice/typesTech/TypesTech'

function Body () {
    const router = useRouter()
    const [page, setPage] = useState('Dashboard')

    useEffect(() => {
        if (router.query.page) {
            setPage(router.query.page)
        }
    }, [page, router.query.page])

    switch (page) {
    case 'Dashboard':
        return <Dashboard/>
    case 'Membres':
        return <Membres/>
    case 'Projets':
        return <Projects/>
    case 'ListesTech':
        return <ListesTech/>
    case 'TypesTech':
        return <TypesTech/>
    default:
        return <Dashboard/>
    }
}

function BackOffice (props) {
    return (
        <div className='BackOffice'>
            <div className='Left shadow-1'>
                <NavBackOffice/>
            </div>
            <div className='Right'>
                <NavTopBackOffice/>
                <div className='bodyOffice'>
                    <Body />
                </div>
            </div>
        </div>
    )
}

export default BackOffice
