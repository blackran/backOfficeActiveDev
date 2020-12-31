import React from 'react'
import {
    IconButton,
    InputAdornment
} from '@material-ui/core'

import {
    Visibility,
    VisibilityOff
} from '@material-ui/icons'

import { useRouter } from 'next/router'
import { login } from './utils/Utils'

function Login () {
    const router = useRouter()
    const [state, setState] = React.useState({ email: '', password: '' })
    const [error, setError] = React.useState(false)
    const [isShow, setIsShow] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const onChangeInput = (e) => {
        setState(true)
        setError(false)
        setState(Object.assign({}, state, { [e.target.name]: e.target.value }))
    }

    /**
     * @params {*} e - objet contient le password et email
     * @returns {void} - renvoi une rien
     */

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        if (!(state.email && state.password)) {
            setIsLoading(false)
            return setError(true)
        }
        const token = await login(state)
        if (token) {
            setIsLoading(false)
            localStorage.setItem('Token', token)
            router.push('/BackOffice')
        } else {
            setIsLoading(false)
        }
    }

    const { email, password } = state
    return (
        <div className='Login'>
            <form className="Center" >
                <div className='header'>
                    <img src='./logo.png' alt='activedev'/>
                    <p>Authentification</p>
                </div>
                <div className='body'>
                    <div>
                        <input
                            type='text'
                            label="Email *"
                            value={email}
                            error={error}
                            onChange={onChangeInput}
                            name='email'
                            style={{ width: 222 }}
                            placeholder='Nom d’utilisateur'
                        />
                    </div>
                    <div>
                        <input
                            type={isShow ? 'text' : 'password'}
                            value={password}
                            onChange={onChangeInput}
                            name='password'
                            error={error}
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
                    <input
                        style={{ cursor: 'pointer' }}
                        className="max-width btn button-light-blue"
                        type="button"
                        value={isLoading ? 'Chargement...' : 'Connexion'}
                        onClick={onSubmit}
                    />
                </div>
            </form>
        </div>
    )
}

export default Login
