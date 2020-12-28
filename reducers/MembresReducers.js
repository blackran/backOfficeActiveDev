import * as st from './actions/typesMembres'
import {
    initReducers,
    addReducers,
    deleteReducers,
    putReducers
} from './Utils'

const initState = {
    datas: [
        {
            idMember: 1,
            firstNameMember: 'RASOLONDRAIBE',
            lastNameMember: 'Andrianantenaina',
            emailMember: 'Nante@gmail.com',
            passwordMember: '',
            imgMember: '',
            isAdmin: 'n'
        }
    ]
}

const reducers = (state = initState, { type, datas }) => {
    switch (type) {
    case st.INIT_MEMBRES:
        return initReducers(state, 'datas', datas)
    case st.ADD_MEMBRES:
        return addReducers(state, 'datas', datas)
    case st.DELETE_MEMBRES:
        return deleteReducers(state, 'datas', datas)
    case st.PUT_MEMBRES:
        return putReducers(state, 'datas', { idMembres: datas.idMembres }, datas)
    default:
        return state
    }
}

export default reducers
