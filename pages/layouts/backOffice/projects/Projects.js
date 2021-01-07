import React, { useEffect, useState } from 'react'
import {
    Add,
    Delete,
    Create,
    Clear,
    Done
} from '@material-ui/icons'
import {
    Button
} from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
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

function DialogSelect ({ datas, onSubmitDialog, idProjets }) {
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
                                return <div 
                                    key={idTechnologies}
                                    className={ isExist ? 'shadow-3' : 'shadow-1' }
                                    onClick={() => clickOne(idTechnologies) }
                                >
                                    <img
                                        src={ imgTechnologies || prefix + '/default.png' }
                                        alt='logo_technologie'
                                    />
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

function OneBlock ({ idTechnologies, isEdit, imgTechnologies, deleteTech }) {
    const [isHoverTech, setIsHoverTech] = useState(false)
    return <div
        key={idTechnologies}
        className='shadow-1'
        onMouseEnter={() => setIsHoverTech(true)}
        onMouseLeave={() => setIsHoverTech(false)}
    >
        {
            isHoverTech && isEdit
                ? <Delete
                    onClick={() => deleteTech(idTechnologies)}
                />
                : <img
                    src={ imgTechnologies || prefix + '/default.png' }
                    alt='logo_technologie'
                />
        }
    </div>
}

function Tech ({ data, alldata, isEdit, onSubmitDialog, deleteTech, idProjets }) {
    return (
        <div className='technologies'>
            {
                data && data.map(({ idTechnologies, imgTechnologies }) => {
                    return <OneBlock
                        deleteTech={deleteTech}
                        idTechnologies={idTechnologies}
                        imgTechnologies={imgTechnologies}
                        isEdit={isEdit}
                    />
                })
            }
            {
                isEdit &&
                <DialogSelect
                    datas={filterIsExist(alldata, data)}
                    idProjets={idProjets}
                    onSubmitDialog={onSubmitDialog}
                />
            }
        </div>
    )
}

function BlockProjects ({ data, onDeleteUser, onModifierUser, i, IsAdd, setIsAdd }) {
    const dispatch = useDispatch()
    const tech = useSelector(state => state.tech.datas)
    const [edit, setEdit] = useState(false)
    const [mouse, setMouse] = useState(false)
    const [style, animate] = useSpring(() => ({ transform: 'translateX(' + 100 * (i + 1) + 'px)', opacity: 0 }))
    const [state, setState] = React.useState({
        idProjets: 0,
        imgProjets: '',
        titleProjets: '',
        contetProjets: '',
        updateAt: '',
        aimeProjets: 0,
        technologies: []
    })
    const { idProjets, titleProjets, contetProjets, technologies } = state

    useEffect(() => {
        if (IsAdd) {
            setEdit(true)
        }
        setState(Object.assign({}, state, data))
    }, [data])

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
        if (IsAdd) {
            dispatch({ type: 'ADD_PROJECTS', datas: state })
            setIsAdd(false)
        } else {
            dispatch({ type: 'PUT_PROJECTS', datas: state })
        }
        setEdit(false)
    }

    useEffect(() => {
        animate({ transform: 'translateX(0px)', opacity: 1 })
    }, [animate, i])

    const onDeleteProject = (idProjets) => {
        console.log('delete: ', idProjets)
        dispatch({ type: 'DELETE_PROJECTS', datas: { idProjets } })
    }

    const onSubmitDialog = (choise) => {
        const stock = Object.assign({}, state, { technologies: [...state.technologies, ...choise] })
        setState(stock)
    }
    const deleteTech = (id) => {
        const stock = Object.assign({}, state, { technologies: state.technologies.filter(e => e.idTechnologies !== id) })
        setState(stock)
    }

    return (<animated.div key={idProjets} style={style}>
        <div
            className='blockProjects shadow-1'
        >
            <div className='headerHover'>
                <div>
                    { edit
                        ? <Done
                            onClick={() => onSubmit() }
                        />
                        : <Create
                            onClick={ () => setEdit(true) }
                        />
                    }
                </div>
                <div>
                    {
                        edit
                            ? <Clear
                                onClick={ () => {
                                    setEdit(false)
                                    if (IsAdd) {
                                        setIsAdd(false)
                                    }
                                }}
                            />
                            : <Delete
                                onClick={() => onDeleteProject(idProjets)}
                            />
                    }
                </div>
            </div>
            <div
                className='divChangeImage'
                onMouseEnter={() => setMouse(true)}
                onMouseLeave={() => setMouse(false)}
            >
                <Dropzone
                    onDrop={ (e) => {
                        onChangeLoginInputImage(e)
                    }}
                >
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <div className='changeImage shadow-1' >
                                    <div>
                                        {
                                            state.imgUser
                                                ? <img src={state.imgUser} alt='image_import'/>
                                                : <img src={ prefix + '/default.png' } alt='icon_default'/>
                                        }
                                    </div>
                                    { mouse && edit && <p>Change image</p> }
                                </div>
                            </div>
                        </section>
                    )}
                </Dropzone>
            </div>
            <div style={{ width: '100%', paddingTop: 20 }}>
                <div className='title'>
                    {
                        edit
                            ? <input
                                value={ titleProjets}
                                onChange={ onChangeInput }
                                name='titleProjets'
                            />
                            : titleProjets
                    }
                </div>
                <div className='content'>
                    {
                        edit
                            ? <textarea
                                value={ contetProjets }
                                onChange={ onChangeInput }
                                name='contetProjets'
                            />
                            : contetProjets
                    }
                </div>
                <Tech
                    data={technologies}
                    alldata={tech}
                    isEdit={edit}
                    idProjets={idProjets}
                    onSubmitDialog={onSubmitDialog}
                    deleteTech={deleteTech}
                />
            </div>
        </div>
    </animated.div>)
}

function Projects (props) {
    const projects = useSelector(state => state.projects.datas)
    const [IsAdd, setIsAdd] = useState(false)
    const dispatch = useDispatch()
    const datas = React.useMemo(() => [
        {
            idProjets: 1,
            imgProjets: '',
            titleProjets: 'SITE DE VENTE ORDINATEURS',
            contetProjects: 'lorem upsome',
            updateAt: '22/04/2002',
            aimeProjets: 2,
            technologies: [
                {
                    idTechnologies: 1,
                    imgTechnologies: '',
                    contentsTechnologies: 'je ne sais pas mois',
                    nameTechnologies: 'Nodejs',
                    urlTechnologies: 'https://nodejs.com'
                }
            ]
        },
        {
            idProjets: 2,
            imgProjets: '',
            titleProjets: 'SITE DE VENTE ORDINATEURS',
            contetProjects: 'lorem upsome',
            updateAt: '22/04/2002',
            aimeProjets: 3,
            technologies: []
        }
    ], [])
    const dataNew = {
        idProjets: null,
        imgProjets: '',
        titleProjets: '',
        contetProjects: '',
        updateAt: '',
        aimeProjets: 0
    }
    useEffect(() => {
        if (datas) {
            dispatch({ type: 'INIT_PROJECTS', datas })
        }
    }, [datas, dispatch])

    // useEffect(() => {
    //     const smallFunction = async () => {
    //         // setIsModif(false)
    //         if (props.id) {
    //             // const user = await findOneUser(props.id)
    //             // if (user) {
    //             //     setState({
    //             //         idUser: user.idUser,
    //             //         lastNameUser: user.lastNameUser,
    //             //         firstNameUser: user.firstNameUser,
    //             //         imgUser: user.imgUser,
    //             //         passwordUser: '',
    //             //         emailUser: user.emailUser,
    //             //         isAdmin: user.isAdmin
    //             //     })
    //             //     setIsModif(true)
    //             // }
    //             setState({
    //                 idProjets: 1,
    //                 imgProjets: '',
    //                 titleProjets: 'SITE DE VENTE ORDINATEURS',
    //                 contetProjects: 'lorem upsome',
    //                 updateAt: '22/04/2002',
    //                 aimeProjets: 2
    //             })
    //         }
    //     }
    //     smallFunction()
    // }, [props.id, isEdit])

    return (
        <div className='Projects'>
            <div className='header'>
                <p>
                    Liste des membres actuels
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
            <div className='body'>
                { IsAdd &&
                    <BlockProjects
                        data={dataNew}
                        i={0}
                        IsAdd={IsAdd}
                        setIsAdd={setIsAdd}
                    />
                }
                {
                    projects && projects.map((e, i) => {
                        return (<BlockProjects
                            key={e.idMembres}
                            data={e}
                            i={i}
                        />)
                    })
                }
            </div>
        </div>
    )
}

export default Projects
