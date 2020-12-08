import * as st from './actions/typesLanguage'

const initState = {
    datas: []
}

const reducers = (state = initState, { type, data }) => {
    let newState = []
    switch (type) {
    case st.INIT_LANGUAGE:
        return Object.assign({}, state, { datas: data })
    case st.ADD_LANGUAGE:
        if (data[0]) {
            newState = [...state.datas, ...data]
        }
        newState = [...state.datas, data]
        return Object.assign({}, state, { datas: newState })
    case st.PUT_LANGUAGE:
        return Object.assign({}, state, { datas: data })
    default:
        return state
    }
}

export default reducers
