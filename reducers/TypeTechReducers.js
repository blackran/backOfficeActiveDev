import * as st from './actions/typesTypeTech'
import {
    initReducers,
    addReducers,
    deleteReducers,
    putReducers
} from './Utils'

const initState = {
    datas: [
        {
            idTypeTechno: 1,
            nameTypeTechno: 'Framework'
        },
        {
            idTypeTechno: 2,
            nameTypeTechno: 'Library'
        }
    ]
}

const reducers = (state = initState, { type, datas }) => {
    switch (type) {
    case st.INIT_TYPE_TECH:
        return initReducers(state, 'datas', datas)
    case st.ADD_TYPE_TECH:
        return addReducers(state, 'datas', datas)
    case st.DELETE_TYPE_TECH:
        return deleteReducers(state, 'datas', datas)
    case st.PUT_TYPE_TECH:
        return putReducers(state, 'datas', { idTypeTechno: datas.idTypeTechno }, datas)
    default:
        return state
    }
}

export default reducers
