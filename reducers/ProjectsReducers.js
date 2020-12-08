import * as st from './actions/typesProjects'

const initState = {
    datas: []
}

const reducers = (state = initState, { type, data }) => {
    let newState = []
    switch (type) {
    case st.INIT_PROJECTS:
        return Object.assign({}, state, { datas: data })
    case st.ADD_PROJECTS:
        if (data[0]) {
            newState = [...state.datas, ...data]
        }
        newState = [...state.datas, data]
        return Object.assign({}, state, { datas: newState })
    case st.PUT_PROJECTS:
        return Object.assign({}, state, { datas: data })
    default:
        return state
    }
}

export default reducers
