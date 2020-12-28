export default function exportDefault () {
    return <div>Show page working ! '</div>
}

let newState = []
const obj = {}

export const initReducers = (state, key, newdata) => {
    obj[key] = newdata
    return Object.assign({}, state, obj)
}

export const addReducers = (state, key, data) => {
    newState = [...state.datas, data]
    if (data[0]) {
        newState = [...state.datas, ...data]
    }
    obj[key] = newState
    return Object.assign({}, state, obj)
}

export const deleteReducers = (state, key, primary) => {
    const PrimaryKey = Object.entries(primary)[0][0]

    newState = state[key].filter(e => {
        return e[PrimaryKey] !== primary[PrimaryKey]
    })
    obj[key] = newState
    return Object.assign({}, state, obj)
}

export const putReducers = (state, key, primary, data) => {
    const PrimaryKey = Object.entries(primary)[0][0]

    newState = state[key].map(e => {
        if (e[PrimaryKey] === primary[PrimaryKey]) {
            return data
        }
        return e
    })
    obj[key] = newState
    return Object.assign({}, state, obj)
}
