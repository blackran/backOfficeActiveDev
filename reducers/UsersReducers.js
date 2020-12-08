import * as st from './actions/typesUsers'

const initState = {
    datas: []
}

const reducers = (state = initState, { type, data }) => {
    let newState = []
    switch (type) {
    case st.INIT_USER:
        return Object.assign({}, state, { datas: data })
    case st.ADD_USER:
        if (data[0]) {
            newState = [...state.datas, ...data]
        }
        newState = [...state.datas, data]
        return Object.assign({}, state, { datas: newState })
    case st.DELETE_USER:
        newState = state.datas.filter(e => {
            return e.idUser !== data.idUser
        })
        return Object.assign({}, state, { datas: newState })
    case st.PUT_USER:
        newState = state.datas.map(e => {
            if (e.idUser === data.idUser) {
                return data
            }
            return e
        })
        return Object.assign({}, state, { datas: newState })
    default:
        return state
    }
}

export default reducers
