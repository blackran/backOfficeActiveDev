import React, { useEffect, useState } from 'react'
import {
    Delete,
    Create,
    Visibility,
    VisibilityOff,
    Image,
    Add
} from '@material-ui/icons'
import {
    InputAdornment,
    IconButton,
    Button,
    Switch
} from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import { withStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'

import { useSelector, useDispatch } from 'react-redux'
// import {
//     getAllUser,
//     deleteUser
// } from './utils/Utils'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function Formulaire ({ state, setIsAdd, onSubmit, handleChangeSwitch, onChangeInput, onChangeLoginInputImage }) {
    const [isShow, setIsShow] = React.useState(false)
    const [isShowC, setIsShowC] = React.useState(false)
    const [mouse, setMouse] = React.useState(false)

    const AntSwitch = withStyles((theme) => ({
        root: {
            width: 28,
            height: 16,
            padding: 0,
            display: 'flex'
        },
        switchBase: {
            padding: 2,
            color: theme.palette.grey[500],
            '&$checked': {
                transform: 'translateX(12px)',
                color: theme.palette.common.white,
                '& + $track': {
                    opacity: 1,
                    backgroundColor: theme.palette.primary.main,
                    borderColor: theme.palette.primary.main
                }
            }
        },
        thumb: {
            width: 12,
            height: 12,
            boxShadow: 'none'
        },
        track: {
            border: `1px solid ${theme.palette.grey[500]}`,
            borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor: theme.palette.common.white
        },
        checked: {}
    }))(Switch)

    return (
        <div className='Formulaire'>
            <h1>Nouveau membre</h1>
            <div className='flex'>
                <div
                    style={{ width: 200, height: 200 }}
                    onMouseEnter={() => setMouse(true)}
                    onMouseLeave={() => setMouse(false)}
                >
                    <Dropzone onDrop={ (e) => { onChangeLoginInputImage(e) } }>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className='changeImage' >
                                        <div>
                                            {
                                                state.imgUser
                                                    ? <img src={state.imgUser} alt='image_import'/>
                                                    : <img src={ prefix + './anon.png' } alt='icon_default'/>
                                            }
                                        </div>
                                        { mouse && <p>edit profile</p> }
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div className='right'>
                    <div>
                        <p>A propos membre</p>
                        <input
                            placeholder="Nom"
                            value={state.nomMembres}
                            onChange={onChangeInput}
                            margin="normal"
                            variant="outlined"
                            name="nomMembres"
                        />
                        <input
                            placeholder="Prenom"
                            value={state.prenomMembres}
                            onChange={onChangeInput}
                            margin="normal"
                            variant="outlined"
                            name="prenomMembres"
                        />
                    </div>
                    <div>
                        <p>A propos membre</p>
                        <input
                            placeholder="email"
                            value={state.emailMembres}
                            onChange={onChangeInput}
                            margin="normal"
                            variant="outlined"
                            name="emailMembres"
                            type='email'
                        />
                        <div className='passwordFlex'>
                            <div>
                                <input
                                    type={isShow ? 'text' : 'password'}
                                    value={state.passwordMembres}
                                    onChange={onChangeInput}
                                    name='passwordMembres'
                                    style={{ width: 167 }}
                                    placeholder='Mot de passe'
                                />
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setIsShow(!isShow)}
                                        onMouseDown={() => setIsShow(!isShow)}
                                        edge="end"
                                    >
                                        {isShow ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            </div>
                            <div
                                style={{
                                    margin: '0 10px',
                                    backgroundColor: 'white',
                                    width: 0
                                }}
                            ></div>
                            <div>
                                <input
                                    type={isShowC ? 'text' : 'password'}
                                    value={state.passwordCMembres}
                                    onChange={onChangeInput}
                                    name='passwordCMembres'
                                    style={{ width: 167 }}
                                    placeholder='Verification mot de passe'
                                />
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setIsShowC(!isShow)}
                                        onMouseDown={() => setIsShowC(!isShow)}
                                        edge="end"
                                    >
                                        {isShow ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: 16,
                            marginBottom: 8,
                            display: 'flex'
                        }}
                    >
                        <p>Administration</p>
                        {' '}
                        <AntSwitch
                            checked={state.isAdmin ? state.isAdmin === 'y' : false}
                            onChange={handleChangeSwitch}
                            name="isAdmin"
                            className='checkboxIsAdmin'
                        />
                    </div>
                    <div className='btnEnregistrer'>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => setIsAdd(false)}
                            className='btnDelete'
                        >
                            Anuller
                        </Button>
                        {' '}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                setIsAdd(true)
                                onSubmit()
                            }}
                            className='btnDelete'
                        >
                            Enregistrer
                        </Button>

                    </div>

                </div>
            </div>
        </div>
    )
}

function Column ({ data, onDeleteUser, onModifierUser, i }) {
    const { idMembres, nomMembres, prenomMembres, emailMembres, imgMembres, isAdmin } = data
    const [style, animate] = useSpring(() => ({ transform: 'translateY(100px)', opacity: 0 }))
    useEffect(() => {
        setTimeout(() =>
            animate({ transform: 'translateY(0px)', opacity: 1 })
        , (i + 1 * 1000))
    }, [animate, i])
    return (<animated.tr key={idMembres} style={style}>
        <td><img src={ prefix + '/me.jpg' } alt='image_user' className='image_user'/></td>
        <td>{nomMembres}</td>
        <td>{prenomMembres}</td>
        <td className='email'>{emailMembres}</td>
        <td className='action'>
            <button
                onClick={() => onDeleteUser(idMembres)}
            >
                <Delete/>
            </button>
            <p> </p>
            <button
                onClick={() => onModifierUser(imgMembres)}
            >
                <Create/>
            </button>
        </td>
        <td className='admin'>
            <button onClick={() => onDeleteUser(imgMembres)}>
                <p
                    style={{
                        backgroundColor: isAdmin === 'y' ? 'green' : 'red'
                    }}
                ></p>
                {isAdmin === 'y' ? 'active' : 'desactive'}
            </button>
        </td>
    </animated.tr>)
}

function Membres (props) {
    const membres = useSelector(state => state.membres.datas)
    const [state, setState] = React.useState({
        idMembres: 0,
        imgMembres: '',
        nomMembres: '',
        prenomMembres: '',
        passwordMembres: '',
        passwordCMembres: '',
        emailMembres: '',
        isAdmin: 'n'
    })

    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()

    const handleChangeSwitch = (e) => {
        const stock = Object.assign({}, state, { isAdmin: e.target.checked ? 'y' : 'n' })
        setState(stock)
    }

    const datas = [
        {
            imgMembres: '',
            idMembres: 1,
            nomMembres: 'RASOLONDRAIBE',
            prenomMembres: 'Andrianantenaina',
            emailMembres: 'Nante@Gmail.com',
            isAdmin: 'y'
        },
        {
            imgMembres: '',
            idMembres: 2,
            nomMembres: 'RASOLONDRAIBE',
            prenomMembres: 'Andrianantenaina',
            emailMembres: 'Nante@Gmail.com',
            isAdmin: 'n'
        }
    ]
    useEffect(() => {
        if (datas) {
            dispatch({ type: 'INIT_MEMBRES', datas })
        }
    }, [dispatch])

    useEffect(() => {
        const smallFunction = async () => {
            // setIsModif(false)
            if (props.id) {
                // const user = await findOneUser(props.id)
                // if (user) {
                //     setState({
                //         idUser: user.idUser,
                //         lastNameUser: user.lastNameUser,
                //         firstNameUser: user.firstNameUser,
                //         imgUser: user.imgUser,
                //         passwordUser: '',
                //         emailUser: user.emailUser,
                //         isAdmin: user.isAdmin
                //     })
                //     setIsModif(true)
                // }
                setState({
                    imgMembres: '',
                    idMembres: 2,
                    nomMembres: 'RASOLONDRAIBE',
                    prenomMembres: 'Andrianantenaina',
                    emailMembres: 'Nante@Gmail.com',
                    isAdmin: 'n'
                })
            }
        }
        smallFunction()
    }, [isEdit])

    const onDeleteUser = async (idMembres) => {
        // const data = await deleteUser(idMembres)
        console.log('onDeleteUser')
        // if (data) {
        dispatch({ type: 'DELETE_MEMBRES', datas: { idMembres } })
        // }
    }

    // const onModifierUser = (idUser) => {
    //     console.log('onModifierUser')
    //     router.push('/Signin?id=' + idUser)
    // }

    //  onModifierUser={onModifierUser}

    const onChangeInput = (e) => {
        setState(Object.assign({}, state, { [e.target.name]: e.target.value }))
    }

    const onChangeLoginInputImage = async (files) => {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            if (state.imgUser !== e.target.result) {
                setState(Object.assign({}, state, { imgUser: e.target.result }))
            }
        }
    }

    const onSubmit = async (e) => {
        // let resp
        // if (isModif) {
        //     resp = await putUser(state)
        // } else {
        //     resp = await addUser(state)
        // }
        // if (resp) {
        //     const data = await findOneUser(jwt(resp).idUser)
        //     // console.log(jwt(resp).idUser, data)
        //     if (isModif) {
        //         dispatch({ type: 'PUT_USER', data })
        //     } else {
        //         dispatch({ type: 'ADD_USER', data })
        //     }
        //     localStorage.setItem('Token', resp)
        //     setState({
        //         lastNameUser: '',
        //         firstNameUser: '',
        //         imgUser: '',
        //         passwordUser: '',
        //         emailUser: '',
        //         isAdmin: 'n'
        //     })
        //     setIsModif(false)
        // }

        setIsEdit(false)
    }

    const setIsAdd = () => {
        setState({
            idMembres: 0,
            imgMembres: '',
            nomMembres: '',
            prenomMembres: '',
            emailMembres: '',
            isAdmin: 'n'
        })
        setIsEdit(false)
    }

    return (
        <div className='Membres'>
            { isEdit
                ? <Formulaire
                    state={state}
                    setIsAdd={setIsAdd}
                    onSubmit={onSubmit}
                    onChangeInput={onChangeInput}
                    onChangeLoginInputImage={onChangeLoginInputImage}
                    handleChangeSwitch={handleChangeSwitch}
                />
                : <div className='Table'>
                    <div className='addButton'>
                        <p>
                            Liste des membres actuels
                        </p>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<Add />}
                            onClick={() => setIsEdit(true)}
                        >
                           Nouveau
                        </Button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>{''}</th>
                                <th>nom</th>
                                <th>prenom</th>
                                <th>email</th>
                                <th>actions</th>
                                <th>admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                membres && membres.map((e, i) => {
                                    return (<Column
                                        key={e.idMembres}
                                        data={e}
                                        i={i}
                                        onDeleteUser={onDeleteUser}
                                    />)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default Membres
