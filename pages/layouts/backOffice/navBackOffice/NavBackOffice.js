import React, { useState, useEffect } from 'react'
import {
    Dashboard,
    ExpandMore,
    ExpandLess,
    Group,
    ViewList,
    Category,
    DevicesOther,
    Build,
    ExitToApp
} from '@material-ui/icons'
import Link from 'next/link'

import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function Item ({ page, Icon, url }) {
    const router = useRouter()
    const [active, setActive] = useState('Dashboard')

    useEffect(() => {
        if (router.query.page) {
            setActive(router.query.page)
        }
    }, [active, router.query.page])
    return (
        <Link href={'BackOffice?page=' + url}>
            <div className={ active === url ? 'active item' : 'item' } >
                <Icon />
                <p>{ page }</p>
            </div>
        </Link>
    )
}

function NavBackOffice (props) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    const handleClick = () => {
        setOpen(!open)
    }

    const deconexion = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'Êtes-vous sûr?',
            text: 'Vous ne pourrez pas revenir en arrière!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, deconnecter!',
            cancelButtonText: 'Non, annulez!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                router.push('/Login')
            }
        })
    }

    return (
        <div className='NavBackOffice'>
            <div className='Header'>
                <img
                    src={ prefix + '/logo.svg' }
                    alt='logo'
                />
                <h1>Administration</h1>
            </div>
            <div className='listNav'>
                <Item
                    Icon={ Dashboard}
                    page='Dashboard'
                    url='Dashboard'
                />
                <Item
                    Icon={ Group }
                    page='Membres'
                    url='Membres'
                />
                <Item
                    Icon={ DevicesOther }
                    page='Projets'
                    url='Projets'
                />
                <div className={ open ? 'colapseActive' : '' } >
                    <div onClick={handleClick} className='item'>
                        <Build />
                        <p>Technologies</p>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </div>
                    {
                        open &&
                        <div className='colapse-child'>
                            <Item
                                Icon={ ViewList }
                                page='Listes'
                                url='ListesTech'
                            />
                            <Item
                                Icon={ Category }
                                page='Types'
                                url='TypesTech'
                            />
                        </div>
                    }
                </div>
                <div className='Deconnexion item' onClick={deconexion} >
                    <ExitToApp />
                    <p>Deconnexion</p>
                </div>
            </div>
        </div>
    )
}

export default NavBackOffice
