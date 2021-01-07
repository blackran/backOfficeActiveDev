import { combineReducers } from 'redux'
import MembresReducers from './MembresReducers'
import ProjectReducers from './ProjectsReducers'
import GlobalReducers from './GlobalReducers'
import LanguageReducers from './LanguageReducers'
import TechReducers from './TechReducers'
import TypeTechReducers from './TypeTechReducers'

export default combineReducers(
    {
        membres: MembresReducers,
        projects: ProjectReducers,
        global: GlobalReducers,
        language: LanguageReducers,
        typeTech: TypeTechReducers,
        tech: TechReducers
    }
)
