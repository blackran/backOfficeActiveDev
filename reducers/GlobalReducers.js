import * as st from './actions/typesGlobal'

const initState = {
    isAdmin: false
}

const reducers = (state = initState, { type, data }) => {
    let newState = []
    switch (type) {
    case st.IS_ADMIN:
        return Object.assign({}, state, { isAdmin: data })
    default:
        return state
    }
}

export default reducers
