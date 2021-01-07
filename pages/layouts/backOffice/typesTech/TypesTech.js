import React, { useEffect, useState } from 'react'
import {
    Delete,
    Create,
    Clear,
    Done,
    Add
} from '@material-ui/icons'
import {
    Button
} from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
// import { withStyles } from '@material-ui/core/styles'

import { useSelector, useDispatch } from 'react-redux'
// import {
// getAllUser,
// deleteUser
// } from './utils/Utils'

// const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function Column ({ data, onSubmit, onDeleteUser, onModifierUser, onChangeInput, i, isAdd, setCancel }) {
    const dispatch = useDispatch()
    const [newdata, setNewdata] = useState({
        idTypeTechno: 0,
        nameTypeTechno: ''
    })
    const [isEdit, setIsEdit] = useState(false)
    const { idTypeTechno, nameTypeTechno } = newdata
    const [style, animate] = useSpring(() => ({ transform: 'translateX(' + 1000 * (i + 1) + 'px)', opacity: 0 }))

    useEffect(() => {
        setNewdata(data)
    }, [data])
    useEffect(() => {
        animate({ transform: 'translateX(0px)', opacity: 1 })
    }, [animate, i])

    const onChangeInputIn = (e) => {
        if (isEdit) {
            setNewdata(Object.assign({}, newdata, { [e.target.name]: e.target.value }))
        } else {
            onChangeInput(e)
        }
    }

    const onDone = () => {
        if (isEdit) {
            setIsEdit(false)
            dispatch({ type: 'PUT_TYPE_TECH', datas: newdata })
        } else {
            onSubmit()
        }
    }

    return (<animated.tr key={idTypeTechno} style={style}>
        <td>
            {
                isAdd || isEdit
                    ? <input
                        value={nameTypeTechno}
                        onChange={onChangeInputIn}
                        name='nameTypeTechno'
                    />
                    : nameTypeTechno
            }

        </td>
        <td className='action'>
            { isAdd || isEdit
                ? <> <button
                    onClick={() => onDone(idTypeTechno)}
                >
                    <Done/>
                </button>
                <p> </p>
                <button
                    onClick={() => {
                        setIsEdit(false)
                        setCancel()
                    }}
                >
                    <Clear/>
                </button>
                </>
                : <>
                    <button
                        onClick={() => onDeleteUser(idTypeTechno)}
                    >
                        <Delete/>
                    </button>
                    <p> </p>
                    <button
                        onClick={() => setIsEdit(true)}
                    >
                        <Create/>
                    </button>
                </>
            }
        </td>
    </animated.tr>)
}

function TypesTech (props) {
    const typeTech = useSelector(state => state.typeTech.datas)
    const [state, setState] = React.useState({
        idTypeTechno: 0,
        nameTypeTechno: ''
    })

    const [isShowAdd, setIsShowAdd] = useState(false)
    const dispatch = useDispatch()

    const datas = [
        {
            idTypeTechno: 1,
            nameTypeTechno: 'Framework'
        },
        {
            idTypeTechno: 2,
            nameTypeTechno: 'Library'
        }
    ]

    const onChangeInput = (e) => {
        setState(Object.assign({}, state, { [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (datas) {
            dispatch({ type: 'INIT_TYPE_TECH', datas })
        }
    }, [dispatch])

    const onDeleteUser = async (idTypeTechno) => {
        // const data = await deleteUser(idMembres)
        console.log('onDeleteUser')
        // if (data) {
        dispatch({ type: 'DELETE_TYPE_TECH', datas: { idTypeTechno } })
        // }
    }

    // const onModifierUser = (idUser) => {
    //     console.log('onModifierUser')
    //     router.push('/Signin?id=' + idUser)
    // }

    //  onModifierUser={onModifierUser}

    const onSubmit = async (e) => {
    // let resp = await addUser(state)
        console.log({ state })
        dispatch({ type: 'ADD_TYPE_TECH', datas: state })
        setState({
            idTypeTechno: 0,
            nameTypeTechno: ''
        })
        setIsShowAdd(false)
    }

    const setIsAdd = () => {
        setIsShowAdd(true)
        setState({
            idTypeTechno: 0,
            nameTypeTechno: ''
        })
    }

    const setCancel = () => {
        setIsShowAdd(false)
        setState({
            idTypeTechno: 0,
            nameTypeTechno: ''
        })
        setIsShowAdd(false)
    }

    return (
        <div className='TypesTech'>
            <div className='Table'>
                <div className='addButton'>
                    <p>
                        Liste des types technologies
                    </p>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Add />}
                        onClick={() => setIsAdd(true)}
                    >
                           Nouveau
                    </Button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>nom</th>
                            <th>actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            typeTech && typeTech.map((e, i) => {
                                return (<Column
                                    key={e.idTypeTechno}
                                    data={e}
                                    i={i}
                                    onDeleteUser={onDeleteUser}
                                />)
                            })
                        }
                        {
                            isShowAdd &&
                                <Column
                                    data={state}
                                    i={0}
                                    isAdd={true}
                                    setCancel={setCancel}
                                    onSubmit={onSubmit}
                                    onChangeInput={onChangeInput}
                                    isEdit={isShowAdd}
                                />
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TypesTech
