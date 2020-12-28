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
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormLabel,
    Radio,
    Button,
    RadioGroup,
    FormControlLabel
} from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import Dropzone from 'react-dropzone'

import { useSelector, useDispatch } from 'react-redux'
// import {
//     getAllUser,
//     deleteUser
// } from './utils/Utils'

function Formulaire ({ state, setIsAdd, onSubmit, onChangeInput, onChangeLoginInputImage }) {
    const [isShow, setIsShow] = React.useState(false)

    return (
        <div className='Formulaire'>
            <div>
                <div>
                    <TextField
                        label="Nom"
                        value={state.nomMembres}
                        onChange={onChangeInput}
                        margin="normal"
                        variant="outlined"
                        name="nomMembres"
                    />
                    {' '}
                    <TextField
                        label="Prenom"
                        value={state.prenomMembres}
                        onChange={onChangeInput}
                        margin="normal"
                        variant="outlined"
                        name="prenomMembres"
                    />
                </div>
                <div>
                    <TextField
                        label="email"
                        value={state.emailMembres}
                        onChange={onChangeInput}
                        margin="normal"
                        variant="outlined"
                        name="emailMembres"
                        type='email'
                    />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={isShow ? 'text' : 'password'}
                            value={state.passwordUser}
                            onChange={onChangeInput}
                            name='passwordMembres'
                            endAdornment={
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
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </div>
                <div style={{ width: 200 }}>
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
                                                    : <Image style={{ fontSize: 64 }}/>
                                            }
                                        </div>
                                        edit profile
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
                <div
                    style={{
                        marginTop: 16,
                        marginBottom: 8
                    }}
                >
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Admin</FormLabel>
                        <RadioGroup
                            aria-label="isAdmin"
                            name="isAdmin"
                            value={state.isAdmin}
                            // onChange={onChangeInput}
                            row
                        >
                            <FormControlLabel value="y" control={<Radio />} label="Oui" />
                            <FormControlLabel value="n" control={<Radio />} label="Non" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div>
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
    )
}

function Column ({ data, onDeleteUser, onModifierUser, i }) {
    const { idProjets, titleProjets, emailMembres, isAdmin } = data
    const [style, animate] = useSpring(() => ({ transform: 'translateY(100px)', opacity: 0 }))
    useEffect(() => {
        setTimeout(() =>
            animate({ transform: 'translateY(0px)', opacity: 1 })
        , (i + 1 * 1000))
    }, [animate, i])
    return (<animated.div key={idProjets} style={style}>
        <div className='blockProjects'>
            <img src='/me.jpg' alt='image_user' className='image_user'/>
            {}
            <div>{titleProjets}</div>
            <div className='email'>{emailMembres}</div>
            <div className='action'>
                <button
                    onClick={() => onDeleteUser(idProjets)}
                >
                    <Delete/>
                </button>
                <p> </p>
                <button
                    onClick={() => onModifierUser(idProjets)}
                >
                    <Create/>
                </button>
            </div>
            <div className='admin'>
                <button onClick={() => onDeleteUser(idProjets)}>
                    <p
                        style={{
                            backgroundColor: isAdmin === 'y' ? 'green' : 'red'
                        }}
                    ></p>
                    {isAdmin === 'y' ? 'active' : 'desactive'}
                </button>
            </div>
        </div>
    </animated.div>)
}

function Projects (props) {
    const membres = useSelector(state => state.membres.datas)
    const [state, setState] = React.useState({
        idProjets: 0,
        imgProjets: '',
        titleProjets: '',
        contetProjects: '',
        updateAt: '',
        aimeProjets: 0
    })

    const [isEdit, setIsEdit] = useState(false)
    const dispatch = useDispatch()
    const datas = [
        {
            idProjets: 1,
            imgProjets: '',
            titleProjets: 'SITE DE VENTE ORDINATEURS',
            contetProjects: 'lorem upsome',
            updateAt: '22/04/2002',
            aimeProjets: 2
        },
        {
            idProjets: 2,
            imgProjets: '',
            titleProjets: 'SITE DE VENTE ORDINATEURS',
            contetProjects: 'lorem upsome',
            updateAt: '22/04/2002',
            aimeProjets: 3
        }
    ]
    useEffect(() => {
        if (datas) {
            dispatch({ type: 'INIT_PROJECTS', datas })
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
                    idProjets: 1,
                    imgProjets: '',
                    titleProjets: 'SITE DE VENTE ORDINATEURS',
                    contetProjects: 'lorem upsome',
                    updateAt: '22/04/2002',
                    aimeProjets: 2
                })
            }
        }
        smallFunction()
    }, [isEdit])

    const onDeleteUser = async (idMembres) => {
        // const data = await deleteUser(idMembres)
        console.log('onDeleteUser')
        // if (data) {
        dispatch({ type: 'DELETE_PROJECTS', datas: { idMembres } })
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
            idProjets: 0,
            imgProjets: '',
            titleProjets: '',
            contetProjects: '',
            updateAt: '',
            aimeProjets: 0
        })
        setIsEdit(false)
    }

    return (
        <div className='Projects'>
            { isEdit
                ? <Formulaire
                    state={state}
                    setIsAdd={setIsAdd}
                    onSubmit={onSubmit}
                    onChangeInput={onChangeInput}
                    onChangeLoginInputImage={onChangeLoginInputImage}
                />
                : <div className='Table'>
                    <div className='addButton'>
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
                    <div className='header'>
                            listes des projects
                    </div>
                    <div className='body'>
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
                    </div>
                </div>
            }
        </div>
    )
}

export default Projects
