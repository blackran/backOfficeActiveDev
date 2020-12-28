import * as st from './actions/typesProjects'
import {
    initReducers,
    addReducers,
    deleteReducers,
    putReducers
} from './Utils'

const initState = {
    datas: [
        {
            idProjets: 1,
            imgProjets: '',
            titleProjets: 'SITE DE VENTE ORDINATEURS',
            contetProjects: 'lorem upsome',
            updateAt: '22/04/2002',
            aimeProjets: 2
        }
    ]
}

const reducers = (state = initState, { type, datas }) => {
    switch (type) {
    case st.INIT_PROJECTS:
        return initReducers(state, 'datas', datas)
    case st.ADD_PROJECTS:
        return addReducers(state, 'datas', datas)
    case st.DELETE_PROJECTS:
        return deleteReducers(state, 'datas', datas)
    case st.PUT_PROJECTS:
        return putReducers(state, 'datas', { idProjets: datas.idProjets }, datas)
    default:
        return state
    }
}

export default reducers
