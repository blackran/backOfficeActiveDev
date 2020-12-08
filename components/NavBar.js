import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import jwt from 'jwt-decode'
import { useRouter } from 'next/router'

import {
    findOneUser
} from '../pages/utils/Utils'

function isAuth (urlNow, url) {
    return (url.filter(e => {
        return e.split('/')[1] === urlNow.split('/')[1]
    }).length > 0)
}

export default function NavBar () {
    const router = useRouter()
    const [user, setUser] = useState({})
    const isAdmin = useSelector(state => state.global.isAdmin)
    const dispatch = useDispatch()
    const url = [
        '/User'
    ]
    useEffect(() => {
        dispatch({ type: 'IS_ADMIN', data: false })
        if (isAuth(router.pathname, url)) {
            if (localStorage.hasOwnProperty('Token')) { // eslint-disable-line
                const token = jwt(localStorage.getItem('Token'))
                async function fetchData () {
                    const stock = await findOneUser(token.idUser)
                    setUser(stock)
                }
                fetchData()
                if (typeof token.idUser === 'number') {
                    if (token.isAdmin === 'y') {
                        dispatch({ type: 'IS_ADMIN', data: true })
                    } else {
                        router.push('/Login')
                    }
                }
            } else {
                router.push('/Login')
            }
        }
    }, [router.pathname])

    const logout = () => {
        localStorage.removeItem('Token')
        dispatch({ type: 'IS_ADMIN', data: false })
        router.push('/Login')
    }

    return (
        <div className='NavBar'>
            <Link href='/'>
                <h1 className='logo'>
                    logo
                </h1>
            </Link>
            <div>
                <Link href='/Contacts'>
                    Contacts
                </Link>
                <Link href='/Projects'>
                   Projet
                </Link>
                <div> | </div>
                <Link href='/Login'>
                    Login
                </Link>
                {
                    isAdmin &&
                        <>
                            <Link href='/User'>
                                User
                            </Link>
                            <div className='image'>
                                <img src={user.imgUser} alt='user_connecter'/>
                            </div>
                            <button onClick={logout}>
                                Logout
                            </button>
                        </>
                }
            </div>
        </div>
    )
}
