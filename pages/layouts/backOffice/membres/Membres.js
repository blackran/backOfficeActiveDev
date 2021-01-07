import React, { useEffect, useState } from 'react'
import {
    Delete,
    Create,
    Visibility,
    VisibilityOff,
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

import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import { useSelector, useDispatch } from 'react-redux'

import {
    filterIsExist
} from '../../../utils/Utils'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function DialogSelect ({ datas, onSubmitDialog, idMembres }) {
    const [choise, setChoise] = useState([])
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const clickOne = (idTechnologies) => {
        const isExist = choise.filter(e => {
            return e.idTechnologies === idTechnologies
        }).length !== 0
        let newdatas = []
        if (isExist) {
            newdatas = choise.filter(e => e.idTechnologies !== idTechnologies)
        } else {
            const stock = datas.filter(e => e.idTechnologies === idTechnologies)
            newdatas = [...choise, ...stock]
        }
        setChoise(newdatas)
    }

    const onSubmit = () => {
        onSubmitDialog(choise)
        handleClose()
        setChoise([])
    }

    return (
        <>
            {/* eslint-disable-next-line */}
            <div className='shadow-1' onClick={handleClickOpen}>
                <Add/>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <div className='dialogProjects'>
                        {
                            datas && datas.map(({ idTechnologies, imgTechnologies }) => {
                                const isExist = choise.filter(e => {
                                    return e.idTechnologies === idTechnologies
                                }).length !== 0
                                // eslint-disable-next-line
                                return <div key={idTechnologies} className={ isExist?'shadow-3': 'shadow-1' } onClick={() => clickOne(idTechnologies) } >
                                    <img src={ imgTechnologies || prefix + '/default.png' } alt='logo_technologie'/>
                                </div>
                            })
                        }
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

function OneBlock ({ idTechnologies, imgTechnologies, deleteTech }) {
    const [isHoverTech, setIsHoverTech] = useState(false)
    return <div
        className='shadow-1'
        onMouseEnter={() => setIsHoverTech(true)}
        onMouseLeave={() => setIsHoverTech(false)}
    >
        {
            isHoverTech
                ? <Delete
                    onClick={() => deleteTech(idTechnologies)}
                />
                : <img src={ imgTechnologies || prefix + '/default.png' } alt='logo_technologie'/>
        }
    </div>
}

function Tech ({ data, alldata, idMembres, onSubmitDialog, deleteTech }) {
    return (
        <div className='technologies'>
            {
                data && data.map(({ idTechnologies, imgTechnologies }) => {
                    return <OneBlock
                        key={idTechnologies}
                        deleteTech={deleteTech}
                        idTechnologies={idTechnologies}
                        imgTechnologies={imgTechnologies}
                    />
                })
            }
            {
                <DialogSelect
                    datas={filterIsExist(alldata, data)}
                    idMembres={idMembres}
                    onSubmitDialog={onSubmitDialog}
                />
            }
        </div>
    )
}

function Formulaire ({ state, setIsAdd, onSubmit, handleChangeSwitch, onChangeInput, onChangeLoginInputImage, onSubmitDialog, deleteTech }) {
    const tech = useSelector(state => state.tech.datas)
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
                                                    : <img src={ prefix + '/anon.png' } alt='icon_default'/>
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
                    <div
                        style={{
                            marginTop: 16,
                            marginBottom: 20,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <p style={{ margin: 0 }}>Technologies</p>
                        {' '}
                        <Tech
                            data={state.technologies}
                            alldata={tech}
                            idMembres={state.idMembres}
                            onSubmitDialog={onSubmitDialog}
                            deleteTech={deleteTech}
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

function Column ({ data, onDelete, onModifier, i, toggleAdmin }) {
    const {
        idMembres, nomMembres, prenomMembres, emailMembres,
        // imgMembres ,
        isAdmin
    } = data
    const [style, animate] = useSpring(() => ({ transform: 'translateX(' + 1000 * (i + 1) + 'px)', opacity: 0 }))
    useEffect(() => {
        animate({ transform: 'translateX(0px)', opacity: 1 })
    }, [animate, i])
    return (<animated.tr style={style}>
        <td><img src={ prefix + '/me.jpg' } alt='image_user' className='image_user'/></td>
        <td>{nomMembres}</td>
        <td>{prenomMembres}</td>
        <td className='email'>{emailMembres}</td>
        <td className='action'>
            <button
                onClick={() => onDelete(idMembres)}
            >
                <Delete/>
            </button>
            <p> </p>
            <button
                onClick={() => onModifier(idMembres)}
            >
                <Create/>
            </button>
        </td>
        <td className='admin'>
            <button onClick={() => toggleAdmin(idMembres)}>
                <p
                    style={{
                        backgroundColor: isAdmin === 'y' ? 'green' : 'red'
                    }}
                ></p>
                {isAdmin === 'y' ? 'desactive' : 'active'}
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
        isAdmin: 'n',
        technologies: []
    })

    // default value false
    const [isEdit, setIsEdit] = useState(false)

    const [isAdd, setIsAdd] = useState(true)
    const dispatch = useDispatch()

    const handleChangeSwitch = (e) => {
        const stock = Object.assign({}, state, { isAdmin: e.target.checked ? 'y' : 'n' })
        setState(stock)
    }

    const datas = [
        {
            idMembres: 1,
            imgMembres: '',
            nomMembres: 'RASOLONDRAIBE',
            prenomMembres: 'Andrianantenaina',
            emailMembres: 'Nante@Gmail.com',
            isAdmin: 'y',
            technologies: []
        },
        {
            idMembres: 2,
            imgMembres: '',
            nomMembres: 'RASOLONDRAIBE',
            prenomMembres: 'Andrianantenaina',
            emailMembres: 'Nante@Gmail.com',
            isAdmin: 'n',
            technologies: []
        }
    ]

    const onSubmitDialog = (e) => {
        const stock = Object.assign({}, state, { technologies: [...state.technologies, ...e] })
        setState(stock)
    }

    const deleteTech = (id) => {
        const stock = Object.assign({}, state, { technologies: state.technologies.filter(e => e.idTechnologies !== id) })
        setState(stock)
    }

    useEffect(() => {
        if (datas) {
            dispatch({ type: 'INIT_MEMBRES', datas })
        }
    }, [dispatch])

    const onDelete = async (idMembres) => {
        // const data = await deleteUser(idMembres)
        // if (data) {
        dispatch({ type: 'DELETE_MEMBRES', datas: { idMembres } })
        // }
    }

    const onModifier = (idMembres) => {
        setIsAdd(false)
        const stock = membres.find(e => e.idMembres === idMembres)
        const newstate = Object.assign({}, state, stock)
        setState(newstate)
        setIsEdit(true)
    }

    const toggleAdmin = (idMembres) => {
        setIsAdd(false)
        const stock = membres.find(e => e.idMembres === idMembres)
        const dat = Object.assign({}, stock, { isAdmin: stock.isAdmin === 'y' ? 'n' : 'y' })
        dispatch({ type: 'PUT_MEMBRES', datas: dat })
    }

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
        if (state.passwordMembres === state.passwordCMembres) {
            if (isAdd) {
                dispatch({ type: 'ADD_MEMBRES', datas: state })
            } else {
                dispatch({ type: 'PUT_MEMBRES', datas: state })
            }
            // if (isAdd) {
            //     resp = await addUser(state)
            // } else {
            //     resp = await putUser(state)
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
    }

    const setModeIsAdd = () => {
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
                    setIsAdd={setModeIsAdd}
                    onSubmit={onSubmit}
                    onChangeInput={onChangeInput}
                    onChangeLoginInputImage={onChangeLoginInputImage}
                    handleChangeSwitch={handleChangeSwitch}
                    onSubmitDialog={onSubmitDialog}
                    deleteTech={deleteTech}
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
                                        key={e.idMembres || i}
                                        data={e}
                                        i={i}
                                        onModifier={onModifier}
                                        onDelete={onDelete}
                                        toggleAdmin={toggleAdmin}
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
