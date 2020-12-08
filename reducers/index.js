import { combineReducers } from 'redux'
import UsersReducers from './UsersReducers'
import ProjectReducers from './ProjectsReducers'
import GlobalReducers from './GlobalReducers'
import LanguageReducers from './LanguageReducers'

export default combineReducers(
    {
        user: UsersReducers,
        projects: ProjectReducers,
        global: GlobalReducers,
        language: LanguageReducers
    }
)
