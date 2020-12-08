import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    getAllLanguage,
    addLanguage,
    deleteLanguage
} from './utils/Utils'

import { useRouter } from 'next/router'
import Dropzone from 'react-dropzone'

function Block ({ data: { idLanguage, nameLanguage, contentLanguage, imgLanguage }, onDeleteLanguage, onModifierLanguage }) {
    const [hover, onHover] = useState(false)
    const [pImage, setPImage] = useState(true)
    const ref = useRef()
    useEffect(() => {
        const { clientWidth, clientHeight } = ref.current
        setPImage(false)
        if (clientWidth > clientHeight) {
            setPImage(true)
        }
    }, [imgLanguage])

    return (
        <div
            className='Block shadow-1'
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
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
            <div>
                <h1>{nameLanguage}</h1>
                <p>{contentLanguage}</p>
                { hover &&
                <div className='action'>
                    <button onClick={() => onDeleteLanguage(idLanguage)}>suprimer</button>
                    <button onClick={() => onModifierLanguage(idLanguage)}>modifier</button>
                </div>
                }
            </div>
        </div>)
}

function AddBlock ({ data: { nameLanguage, contentLanguage, imgLanguage }, onChangeInput, onChangeLoginInputImage }) {
    const [hover, onHover] = useState(true)
    const [pImage, setPImage] = useState(true)
    const ref = useRef()
    const [mouse, setMouse] = useState(false)
    useEffect(() => {
        const { clientWidth, clientHeight } = ref.current
        setPImage(false)
        if (clientWidth > clientHeight) {
            setPImage(true)
        }
    }, [imgLanguage])
    return (
        <div
            className='AddBlock shadow-1'
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
        >
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

            <div>
                <input
                    type='text'
                    value={nameLanguage}
                    onChange={onChangeInput}
                    name='nameLanguage'
                    className='nameLanguage'
                    placeholder='nom'
                />
                <textarea
                    value={contentLanguage}
                    onChange={onChangeInput}
                    name='contentLanguage'
                    rows = "3"
                >
                    detail
                </textarea>
            </div>
        </div>)
}

function Language (props) {
    const router = useRouter()
    const language = useSelector(state => state.language.datas)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        nameLanguage: '',
        contentLanguage: '',
        imgLanguage: ''
    })
    React.useEffect(() => {
        if (props.data) {
            dispatch({ type: 'INIT_LANGUAGE', data: props.data })
        }
    }, [props.data, dispatch])

    const onDeleteLanguage = async (idLanguage) => {
        const data = await deleteLanguage(idLanguage)
        dispatch({ type: 'DELETE_LANGUAGE', data })
    }

    const onModifierLanguage = (idLanguage) => {
        console.log('onModifierLanguage')
    }

    const onChangeInput = (e) => {
        console.log(e.target.value)
        setState(Object.assign({}, state, { [e.target.name]: e.target.value }))
    }

    const onChangeLoginInputImage = async (files) => {
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            if (state.imgUser !== e.target.result) {
                setState(Object.assign({}, state, { imgProject: e.target.result }))
            }
        }
    }

    return (
        <div className='Language'>
            {
                language && language.map((data) => {
                    return (<Block
                        key={data.idLanguage}
                        data={data}
                        onModifierLanguage={onModifierLanguage}
                        onDeleteLanguage={onDeleteLanguage}
                    />)
                })
            }
            <AddBlock
                data={state}
                onChangeInput={onChangeInput}
                onChangeLoginInputImage={onChangeLoginInputImage}
            />
        </div>
    )
}

Language.getInitialProps = async (ctx) => {
    const data = await getAllLanguage()
    return { data }
}

export default Language
