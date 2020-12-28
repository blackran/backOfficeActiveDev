import { combineReducers } from 'redux'
import MembresReducers from './MembresReducers'
import ProjectReducers from './ProjectsReducers'
import GlobalReducers from './GlobalReducers'
import LanguageReducers from './LanguageReducers'

export default combineReducers(
    {
        membres: MembresReducers,
        projects: ProjectReducers,
        global: GlobalReducers,
        language: LanguageReducers
    }
)
