import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    getAllUser,
    deleteUser
} from './utils/Utils'

import { useRouter } from 'next/router'

function User (props) {
    const router = useRouter()
    const users = useSelector(state => state.user.datas)
    const dispatch = useDispatch()
    React.useEffect(() => {
        if (props.data) {
            dispatch({ type: 'INIT_USER', data: props.data })
        }
    }, [props.data, dispatch])

    const onDeleteUser = async (idUser) => {
        const data = await deleteUser(idUser)
        dispatch({ type: 'DELETE_USER', data })
    }

    const onModifierUser = (idUser) => {
        console.log('onModifierUser')
        router.push('/Signin/' + idUser)
    }

    return (
        <div className='User'>
            <div className='Table'>
                <table>
                    <thead>
                        <tr>
                            <th>{''}</th>
                            <th>nom</th>
                            <th>prenom</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.map(({ idUser, lastNameUser, firstNameUser, emailUser, imgUser, isAdmin }) => {
                                return (<tr key={idUser}>
                                    <td><img src={imgUser} alt='image_user' className='image_user'/></td>
                                    <td>{firstNameUser}</td>
                                    <td>{lastNameUser}</td>
                                    <td className='action'>
                                        <button onClick={() => onDeleteUser(idUser)}>suprimer</button>
                                        <p>|</p>
                                        <button onClick={() => onModifierUser(idUser)}>modifier</button>
                                    </td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

User.getInitialProps = async (ctx) => {
    const data = await getAllUser()
    return { data }
}

export default User
