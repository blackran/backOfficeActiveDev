import React, { useRef, useState, useEffect } from 'react'

import {
    TextField
} from '@material-ui/core'

import Dropzone from 'react-dropzone'

import dynamic from 'next/dynamic'
import jwt from 'jwt-decode'
import {
    findOneUser,
    addProjects,
    getAllProject
} from './utils/Utils'

import $ from 'jquery'

import { useRouter } from 'next/router'

const importSummernote = () => {
    if (typeof window !== 'undefined') {
        window.jQuery = $
        require('bootstrap')
    }
    return import('react-summernote')
}

const ReactSummernote = dynamic(importSummernote, {
    ssr: false
})

function ModeEdit ({ state, contentProject, onChangeInput, onChangeLoginInputImage, onChange, onImageUpload, user }) {
    const [pImage, setPImage] = useState(true)
    const ref = useRef()
    useEffect(() => {
        const { clientWidth, clientHeight } = ref.current
        setPImage(false)
        if (clientWidth > clientHeight) {
            setPImage(true)
        }
    }, [state.imgProject])
    const [mouse, setMouse] = useState(false)
    return (
        <div className='ModeEdit'>
            <div className='title'>
                <TextField
                    label="Titre"
                    value={state.titleProject}
                    onChange={onChangeInput}
                    margin="normal"
                    variant="outlined"
                    name="titleProject"
                />
            </div>
            <div className='bottom'>
                <div className='Dropzone'>
                    <Dropzone onDrop={(e) => { onChangeLoginInputImage(e) }}>
                        {({ getRootProps, getInputProps }) => (
                            <section>
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div
                                        className='changeImage'
                                        onMouseEnter={() => setMouse(true)}
                                        onMouseLeave={() => setMouse(false)}
                                    >
                                        <div>
                                            <img
                                                ref={ref}
                                                alt='image_import'
                                                style={{
                                                    width: !pImage ? 200 : 'auto',
                                                    height: pImage ? 200 : 'auto'
                                                }}
                                                src='/add-new-project.jpg'
                                                alt='image_language'
                                            />

                                        </div>
                                        { mouse && <p>change image</p> }
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </div>

                <ReactSummernote
                // value={state.contentProject}
                    onInit={() => {
                        const editArea = document.querySelector('.note-editable')
                        editArea.innerHTML = contentProject
                    }}
                    options={{
                        lang: 'ru-RU',
                        height: 350,
                        dialogsInBody: true,
                        toolbar: [
                            ['style', ['style']],
                            ['font', ['bold', 'underline', 'clear']],
                            // ['fontname', ['fontname']],
                            ['para', ['ul', 'ol', 'paragraph']],
                            ['table', ['table']],
                            ['insert', ['link', 'picture', 'video']]
                            // ['view', ['fullscreen', 'codeview']]
                        ]
                    }}
                    onChange={onChange}
                    onImageUpload={onImageUpload}
                />
            </div>
        </div>
    )
}

function ShowingProject ({ state }) {
    const [pImage, setPImage] = useState(true)
    const ref = useRef()
    useEffect(() => {
        const { clientWidth, clientHeight } = ref.current
        setPImage(false)
        if (clientWidth > clientHeight) {
            setPImage(true)
        }
    }, [state.imgProject])
    return (
        <div className='ShowingProject'>
            <div className='title'>
                <div>
                    {state.titleProject}
                </div>
            </div>
            <div className='bottom'>
                <div className='Dropzone'>
                    <div className='changeImage'>
                        <div>
                            <img
                                ref={ref}
                                alt='image_import'
                                style={{
                                    width: !pImage ? 200 : 'auto',
                                    height: pImage ? 200 : 'auto'
                                }}
                                src='/add-new-project.jpg'
                                alt='image_language'
                            />
                        </div>
                    </div>
                </div>
                <div>
                    {state.contentProject}
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

function ProjectsDetails (props) {
    const router = useRouter()
    const [edit, setEdit] = useState(false)
    const [user, setUser] = useState(null)
    const [isDelete, setIsDelete] = useState(false)
    const [state, setState] = useState({
        idProject: 0,
        titleProject: 'Titre',
        contentProject: 'Detail sur le nouveau projet',
        idUser: 0,
        language: [],
        imgProject: null,
        idLanguage: 1
    })

    const [contentProject, setContentProject] = useState('Detail sur le nouveau projet')

    const onChange = (contentProject) => {
        setContentProject(contentProject)
    }

    const onImageUpload = (images, insertImage) => {
        /* FileList does not support ordinary array methods */
        for (let i = 0; i < images.length; i++) {
            /* Stores as bas64enc string in the text.
             * Should potentially be stored separately and include just the url
             */
            const reader = new FileReader()

            reader.onloadend = () => {
                insertImage(reader.result)
            }

            reader.readAsDataURL(images[i])
        }
    }

    useEffect(() => {
        if (props.data) {
            console.log(props.data)
            setState(props.data)
        }
        if (localStorage.hasOwnProperty('Token')) { // eslint-disable-line
            const token = jwt(localStorage.getItem('Token'))
            if (token) {
                if (typeof token.idUser === 'number') {
                    async function fetchData () {
                        const stock = await findOneUser(token.idUser)
                        setUser(stock)
                        setState(Object.assign({}, state, { idUser: token.idUser }))
                    }
                    fetchData()
                }
            }
        }
    }, [props.data])

    const onChangeLoginInputImage = async (files) => {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            if (state.imgUser !== e.target.result) {
                setState(Object.assign({}, state, { imgProject: e.target.result }))
            }
        }
    }
    const enregistrer = async () => {
        const stock = Object.assign({}, state, { contentProject: contentProject })
        setState(stock)
        const response = await addProjects(stock)
        console.log({ response })
        setEdit(false)
    }

    const onChangeInput = (e) => {
        setState(Object.assign({}, state, { [e.target.name]: e.target.value }))
    }

    const onClickChangeDelete = (e) => {
        console.log('idProject', state.idProject)
        router.push('/Projects')
        setIsDelete(false)
    }

    return (<div className='ProjectsDetails'>
        <div className='header'>
            <div>
            </div>
            {
                isDelete
                    ? <div>
                        <button onClick={onClickChangeDelete()}>
                            Suprimer
                        </button>{' '}
                        <button onClick={() => setIsDelete(false)}>
                            Annuller
                        </button>
                    </div>
                    : <div>
                        {
                            edit
                                ? <div>
                                    {
                                        state.idProject !== '' &&
                                    <button onClick={() => setIsDelete(true)}>
                                        Suprimer
                                    </button>
                                    }
                                    {' '}
                                    <button onClick={enregistrer}>
                                        Enregistrer
                                    </button>
                                </div>
                                : <div>
                                    {
                                        state.idProject !== '' &&
                                    <button onClick={() => setIsDelete(true)}>
                                        Suprimer
                                    </button>
                                    }
                                    {' '}
                                    <button onClick={() => setEdit(true)}>
                                    Edit
                                    </button>
                                </div>
                        }
                    </div>

            }
        </div>
        {
            edit
                ? <ModeEdit
                    state={state}
                    onChangeLoginInputImage={onChangeLoginInputImage}
                    onChange={onChange}
                    onImageUpload={onImageUpload}
                    onChangeInput={onChangeInput}
                    contentProject={contentProject}
                    user={user}
                />
                : <ShowingProject
                    state={state}
                    user={user}
                />
        }
    </div>
    )
}

ProjectsDetails.getInitialProps = async ({ query: { id } }) => {
    let data = await getAllProject()
    if (data) {
        data = data.find(e => e.idProject === id)
    }
    return { data }
}

export default ProjectsDetails
