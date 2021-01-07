import React, { useEffect, useState } from 'react'
import {
    Delete,
    Create,
    Add
} from '@material-ui/icons'
import {
    Button
} from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import { withStyles } from '@material-ui/core/styles'
import Dropzone from 'react-dropzone'

import { useSelector, useDispatch } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputBase from '@material-ui/core/InputBase'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function Formulaire ({ state, setIsAdd, onSubmit, onChangeInputSelect, handleChangeSwitch, onChangeInput, onChangeLoginInputImage, onSubmitDialog, deleteTech }) {
    const typeTech = useSelector(state => state.typeTech.datas)
    const [mouse, setMouse] = React.useState(false)

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3)
            }
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: '#EDEDED',
            marginLeft: 10,
            border: 'none',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"'
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
            }
        }
    }))(InputBase)

    return (
        <div className='Formulaire'>
            <h1>Nouveau Technologies</h1>
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
                                                state.imgTechnologies
                                                    ? <img
                                                        src={state.imgTechnologies}
                                                        alt='image_import'
                                                    />
                                                    : <img
                                                        src={ prefix + '/default.png' }
                                                        alt='icon_default'
                                                    />
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
                        <p>A propos technologies</p>
                        <input
                            placeholder="Nom"
                            value={state.nameTechnologies}
                            onChange={onChangeInput}
                            margin="normal"
                            variant="outlined"
                            name="nameTechnologies"
                        />
                        <input
                            placeholder="Contenant"
                            value={state.contentsTechnologies}
                            onChange={onChangeInput}
                            margin="normal"
                            variant="outlined"
                            name="contentsTechnologies"
                            row={3}
                        />
                        <input
                            placeholder="url"
                            value={state.urlTechnologies}
                            onChange={onChangeInput}
                            margin="normal"
                            variant="outlined"
                            name="urlTechnologies"
                        />
                    </div>
                    <div
                        style={{
                            marginTop: 16,
                            marginBottom: 8,
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <p style={{ marginBottom: 0 }}>Type</p>
                        {' '}
                        <FormControl>
                            <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={state.typeTechnologies.idTypeTechno || ''}
                                onChange={onChangeInputSelect}
                                input={<BootstrapInput />}
                                name='typeTechnologies'
                            >
                                {
                                    typeTech && typeTech.map(({ idTypeTechno, nameTypeTechno }) => {
                                        return <MenuItem key={idTypeTechno} value={ idTypeTechno }>
                                            { nameTypeTechno }
                                        </MenuItem>
                                    })
                                }
                            </Select>
                        </FormControl>
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

function Column ({ data, onDelete, onModifier, i }) {
    const {
        idTechnologies,
        imgTechnologies,
        nameTechnologies,
        urlTechnologies,
        typeTechnologies: { nameTypeTechno }
    } = data
    const [style, animate] = useSpring(() => ({ transform: 'translateX(' + 1000 * (i + 1) + 'px)', opacity: 0 }))
    useEffect(() => {
        animate({ transform: 'translateX(0px)', opacity: 1 })
    }, [animate, i])
    return (<animated.tr style={style}>
        <td><img src={ prefix + '/default.png' || imgTechnologies } alt='default' className='image_user'/></td>
        <td>{nameTechnologies}</td>
        <td className='email'>{urlTechnologies}</td>
        <td>{nameTypeTechno}</td>
        <td className='action'>
            <button
                onClick={() => onDelete(idTechnologies)}
            >
                <Delete/>
            </button>
            <p> </p>
            <button
                onClick={() => onModifier(idTechnologies)}
            >
                <Create/>
            </button>
        </td>
    </animated.tr>)
}

function ListesTech (props) {
    const tech = useSelector(state => state.tech.datas)
    const typeTech = useSelector(state => state.typeTech.datas)
    const [state, setState] = React.useState({
        idTechnologies: 0,
        imgTechnologies: '',
        contentsTechnologies: '',
        nameTechnologies: '',
        urlTechnologies: '',
        typeTechnologies: {}
    })

    // default value false
    const [isEdit, setIsEdit] = useState(false)

    const [isAdd, setIsAdd] = useState(true)
    const dispatch = useDispatch()

    useEffect(() => {
        if (typeTech.lenght !== 0) {
            const stock = Object.assign({}, state, { typeTechnologies: typeTech[0] })
            setState(stock)
        }
    }, [])

    // useEffect(() => {
    //     if (datas) {
    //         dispatch({ type: 'INIT_MEMBRES', datas })
    //     }
    // }, [dispatch])

    const onDelete = async (idTechnologies) => {
        // const data = await deleteUser(idMembres)
        // if (data) {
        dispatch({ type: 'DELETE_TECH', datas: { idTechnologies } })
        // }
    }

    const onModifier = (idTechnologies) => {
        setIsAdd(false)
        const stock = tech.find(e => e.idTechnologies === idTechnologies)
        const newstate = Object.assign({}, state, stock)
        setState(newstate)
        setIsEdit(true)
    }

    const onChangeInput = (e) => {
        setState(Object.assign({}, state, { [e.target.name]: e.target.value }))
    }

    const onChangeLoginInputImage = async (files) => {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            if (state.imgUser !== e.target.result) {
                setState(Object.assign({}, state, { imgTechnologies: e.target.result }))
            }
        }
    }

    const onSubmit = async (e) => {
        if (isAdd) {
            dispatch({ type: 'ADD_TECH', datas: state })
        } else {
            dispatch({ type: 'PUT_TECH', datas: state })
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

    const setModeIsAdd = () => {
        setState({
            idTechnologies: 0,
            imgTechnologies: '',
            contentsTechnologies: '',
            nameTechnologies: '',
            urlTechnologies: '',
            typeTechnologies: {}
        })
        setIsEdit(false)
    }

    const onChangeInputSelect = (event) => {
        const stock = typeTech.find(e => e.idTypeTechno === parseInt(event.target.value))
        if (stock) {
            setState(Object.assign({}, state, { [event.target.name]: stock }))
        }
    }

    return (
        <div className='ListesTech'>
            { isEdit
                ? <Formulaire
                    state={state}
                    setIsAdd={setModeIsAdd}
                    onSubmit={onSubmit}
                    onChangeInput={onChangeInput}
                    onChangeLoginInputImage={onChangeLoginInputImage}
                    onChangeInputSelect={onChangeInputSelect}
                />
                : <div className='Table'>
                    <div className='addButton'>
                        <p>
                            Liste Technologies
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
                                <th>url</th>
                                <th>type</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tech && tech.map((e, i) => {
                                    return (<Column
                                        key={e.idTechnologies || i}
                                        data={e}
                                        i={i}
                                        onModifier={onModifier}
                                        onDelete={onDelete}
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

export default ListesTech
