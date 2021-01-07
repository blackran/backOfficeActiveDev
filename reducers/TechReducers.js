import * as st from './actions/typesTech'
import {
    initReducers,
    addReducers,
    deleteReducers,
    putReducers
} from './Utils'

const initState = {
    datas: [
        {
            idTechnologies: 1,
            imgTechnologies: '',
            contentsTechnologies: 'je ne sais pas mois',
            nameTechnologies: 'Nodejs',
            urlTechnologies: 'https://nodejs.com',
            typeTechnologies: {
                idTypeTechno: 1,
                nameTypeTechno: 'Framework'
            }
        },
        {
            idTechnologies: 2,
            imgTechnologies: '',
            contentsTechnologies: 'je ne sais pas mois',
            nameTechnologies: 'Reactjs',
            urlTechnologies: 'https://react.com',
            typeTechnologies: {
                idTypeTechno: 1,
                nameTypeTechno: 'Framework'
            }
        }
    ]
}

const reducers = (state = initState, { type, datas }) => {
    switch (type) {
    case st.INIT_TECH:
        return initReducers(state, 'datas', datas)
    case st.ADD_TECH:
        return addReducers(state, 'datas', datas)
    case st.DELETE_TECH:
        return deleteReducers(state, 'datas', datas)
    case st.PUT_TECH:
        return putReducers(state, 'datas', { idTechnologies: datas.idTechnologies }, datas)
    default:
        return state
    }
}

export default reducers
