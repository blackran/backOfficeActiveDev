import React, { useEffect } from 'react'
import {
    Button,
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    InputLabel,
    IconButton,
    InputAdornment,
    OutlinedInput
} from '@material-ui/core'
import Dropzone from 'react-dropzone'
import {
    Image,
    Visibility,
    VisibilityOff
} from '@material-ui/icons'
import {
    addUser,
    findOneUser,
    putUser
} from './utils/Utils'
import jwt from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'

function Formulaire ({ state, setIsAdd, onSubmit, onChangeInput, onChangeLoginInputImage }) {
    const [isShow, setIsShow] = React.useState(false)

    return (
        <div className='Formulaire'>
            <div>
                <div>
                    <TextField
                        label="firstNameUser"
                        value={state.firstNameUser}
                        onChange={onChangeInput}
                        margin="normal"
                        variant="outlined"
                        name="firstNameUser"
                    />
                    {' '}
                    <TextField
                        label="lastNameUser"
                        value={state.lastNameUser}
                        onChange={onChangeInput}
                        margin="normal"
                        variant="outlined"
                        name="lastNameUser"
                    />
                </div>
                <div>
                    <TextField
                        label="emailUser"
                        value={state.emailUser}
                        onChange={onChangeInput}
                        margin="normal"
                        variant="outlined"
                        name="emailUser"
                        type='email'
                    />
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={isShow ? 'text' : 'password'}
                            value={state.passwordUser}
                            onChange={onChangeInput}
                            name='passwordUser'
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
function Signin (props) {
    const router = useRouter()
    const [state, setState] = React.useState({
        idUser: 0,
        lastNameUser: '',
        firstNameUser: '',
        imgUser: '',
        passwordUser: '',
        emailUser: '',
        isAdmin: 'n'
    })
    const [isModif, setIsModif] = React.useState(false)
    const dispatch = useDispatch()

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
        let resp
        if (isModif) {
            resp = await putUser(state)
        } else {
            resp = await addUser(state)
        }
        if (resp) {
            const data = await findOneUser(jwt(resp).idUser)
            // console.log(jwt(resp).idUser, data)
            if (isModif) {
                dispatch({ type: 'PUT_USER', data })
            } else {
                dispatch({ type: 'ADD_USER', data })
            }
            localStorage.setItem('Token', resp)
            setState({
                lastNameUser: '',
                firstNameUser: '',
                imgUser: '',
                passwordUser: '',
                emailUser: '',
                isAdmin: 'n'
            })
            setIsModif(false)
        }
    }

    const setIsAdd = () => {
        setState({
            lastNameUser: '',
            firstNameUser: '',
            imgUser: '',
            passwordUser: '',
            emailUser: '',
            isAdmin: 'n'
        })
        router.push('/Login')
    }

    useEffect(() => {
        const smallFunction = async () => {
            setIsModif(false)
            if (props.id) {
                const user = await findOneUser(props.id)
                if (user) {
                    setState({
                        idUser: user.idUser,
                        lastNameUser: user.lastNameUser,
                        firstNameUser: user.firstNameUser,
                        imgUser: user.imgUser,
                        passwordUser: '',
                        emailUser: user.emailUser,
                        isAdmin: user.isAdmin
                    })
                    setIsModif(true)
                }
            }
        }
        smallFunction()
    }, [props.id])

    return (
        <div className='Signin'>
            <Formulaire
                state={state}
                setIsAdd={setIsAdd}
                onSubmit={onSubmit}
                onChangeInput={onChangeInput}
                onChangeLoginInputImage={onChangeLoginInputImage}
            />
        </div>
    )
}

Signin.getInitialProps = async ({ query: { id } }) => {
    return { id }
}

export default Signin
