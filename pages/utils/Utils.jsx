import axios from 'axios'

export const login = async (data) => {
    let response
    const query = 'query {login(emailUser: "' + data.email + '", passwordUser: "' + data.password + '") { token }}'
    try {
        const { data: { data } } = await axios.post('/', { query }, {
            headers: { 'Content-Tranfer-Encoding': 'multipart/form-data', 'Content-Type': 'application/json' }
        })

        if (data.login) {
            response = data.login.token
        }
    } catch (error) {
        console.log({ error })
    }
    return response
}

export const addUser = async (data) => {
    let response
    const query = 'mutation { addUser(firstNameUser: "' + data.firstNameUser +
        '", lastNameUser:"' + data.lastNameUser +
        '", emailUser: "' + data.emailUser +
        '", passwordUser:"' + data.passwordUser +
        '", imgUser:"' + data.imgUser +
        '", isAdmin:"' + data.isAdmin + '") { token } }'
    try {
        const { data: { data } } = await axios.post('/', { query }, {
            headers: { 'Content-Tranfer-Encoding': 'multipart/form-data', 'Content-Type': 'application/json' }
        })
        if (data.addUser) {
            response = data.addUser.token
        }
    } catch (error) {
        console.log({ error })
    }
    return response
}

export const getAllUser = async () => {
    const query = 'query { getAllUser { idUser lastNameUser firstNameUser emailUser imgUser isAdmin }}'
    let data = null
    try {
        const { data: { data: { getAllUser } } } = await axios.post('/', null, { params: { query } })
        console.log(getAllUser)
        data = getAllUser
    } catch (error) {
        console.log({ error })
    }
    return data
}

export const putUser = async (data) => {
    let response
    const query = 'mutation { putUser(idUser: ' + data.idUser +
        ', firstNameUser: "' + data.firstNameUser +
        '", lastNameUser:"' + data.lastNameUser +
        '", emailUser: "' + data.emailUser +
        '", passwordUser:"' + data.passwordUser +
        '", imgUser:"' + data.imgUser +
        '", isAdmin:"' + data.isAdmin + '") { token } }'
    try {
        const { data: { data } } = await axios.post('/', { query }, {
            headers: { 'Content-Tranfer-Encoding': 'multipart/form-data', 'Content-Type': 'application/json' }
        })
        if (data.putUser) {
            response = data.putUser.token
        }
    } catch (error) {
        console.log({ error })
    }
    return response
}

export const deleteUser = async (idUser) => {
    const query = 'mutation { deleteUser(idUser: ' + idUser + ') { idUser lastNameUser firstNameUser emailUser imgUser isAdmin }}'
    let response
    try {
        const { data: { data: { deleteUser } } } = await axios.post('/', null, { params: { query } })
        deleteUser.idUser = idUser
        if (deleteUser) {
            response = deleteUser
        }
    } catch (error) {
        console.log({ error })
    }
    return response
}

export const findOneUser = async (idUser) => {
    const query = 'query { findOneUser(idUser: ' + idUser + ') { idUser lastNameUser firstNameUser emailUser imgUser isAdmin }}'
    let response
    try {
        const { data: { data: { findOneUser } } } = await axios.post('/', null, { params: { query } })
        if (findOneUser) {
            response = findOneUser
        }
    } catch (error) {
        console.log({ error })
    }
    return response
}

export const getAllProject = async () => {
    const query = 'query { getAllProject { idProject titleProject contentProject imgProject user { idUser } language { idLanguage } updateAt } }'
    let data = null
    try {
        const { data: { data: { getAllProject } } } = await axios.post('/', null, { params: { query } })
        data = getAllProject
    } catch (error) {
        console.log({ error })
    }
    return data
}

export const addProjects = async (data) => {
    const query = 'mutation {addProject(imgProject:"' + data.imgProject +
        '", titleProject: "' + data.titleProject +
        '", contentProject:"' + data.contentProject +
        '", idLanguage:' + data.idLanguage +
        ', idUser:' + data.idUser + '){ idProject titleProject contentProject imgProject updateAt user { idUser } language { idLanguage urlLanguage imgLanguage } }}'

    let response
    try {
        const { data: { data } } = await axios.post('/', { query }, {
            headers: { 'Content-Tranfer-Encoding': 'multipart/form-data', 'Content-Type': 'application/json' }
        })
        if (data.addProject) {
            response = data.addProject
        }
    } catch (error) {
        console.log({ error })
    }
    return response
}

export const addLanguage = async (data) => {
    const query = 'mutation {addLanguage(imgLanguage:"' + data.imgLanguage +
        '", contentLanguage: "' + data.contentLanguage +
        '", nameLanguage: "' + data.nameLanguage +
        '", urlLanguage:"' + data.urlLanguage +
        '", idUser:' + data.idUser + '){ imgLanguage contentLanguage nameLanguage urlLanguage idUser project { idProject titleProject contentProject imgProject updateAt user { idUser } language { idLanguage urlLanguage imgLanguage}}}}'

    let response
    try {
        const { data: { data } } = await axios.post('/', { query }, {
            headers: { 'Content-Tranfer-Encoding': 'multipart/form-data', 'Content-Type': 'application/json' }
        })
        if (data.addLanguage) {
            response = data.addLanguage
        }
    } catch (error) {
        console.log({ error })
    }
    return response
}

export const getAllLanguage = async () => {
    const query = 'query { getAllLanguage { idLanguage nameLanguage contentLanguage imgLanguage project { idProject } } }'
    let data = null
    try {
        const { data: { data: { getAllLanguage } } } = await axios.post('/', null, { params: { query } })
        data = getAllLanguage
    } catch (error) {
        console.log({ error })
    }
    return data
}

export const deleteLanguage = async (idLanguage) => {
    const query = 'mutation { deleteLanguage(idLanguage: ' + idLanguage + ') { idLanguage nameLanguage contentLanguage imgLanguage project { idProject } }}'
    let response
    try {
        const { data: { data: { deleteLanguage } } } = await axios.post('/', null, { params: { query } })
        deleteLanguage.idLanguage = idLanguage
        if (deleteLanguage) {
            response = deleteLanguage
        }
    } catch (error) {
        console.log({ error })
    }
    return response
}
