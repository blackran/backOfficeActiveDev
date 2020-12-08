import NavBar from '../components/NavBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'

// import * as serviceWorker from '../reducers/serviceWorker'
import { Provider } from 'react-redux'
import store from '../reducers/store'
import axios from 'axios'

import { green } from '@material-ui/core/colors/'

import '../statics/styles/Global.scss'
import '../statics/styles/NavBar.scss'
import '../statics/styles/Projects.scss'
import '../statics/styles/Login.scss'
import '../statics/styles/User.scss'
import '../statics/styles/Signin.scss'
import '../statics/styles/BlockProject.scss'
import '../statics/styles/ProjectsDetails.scss'
import '../statics/styles/Language.scss'

// import 'jodit'
// import 'jodit/build/jodit.min.css'

import 'react-summernote/dist/react-summernote.css' // import styles
// import 'react-summernote/lang/summernote-ru-RU' // you can import any other locale
// import 'bootstrap/js/modal'
// import 'bootstrap/js/dropdown'
// import 'bootstrap/js/tooltip'
import 'bootstrap/dist/css/bootstrap.css'

// const NavBar = require('../components/NavBar')
// const { MuiThemeProvider, createMuiTheme } = require('@material-ui/core')
//
// // import * as serviceWorker from '../reducers/serviceWorker'
// const { Provider } = require('react-redux')
// const store = require('../reducers/store')
// const axios = require('axios')
//
// const { green } = require('@material-ui/core/colors/')

const theme = createMuiTheme({
    palette: {
        primary: {
            light: green[0],
            main: green[500],
            dark: green[900]
        },
        secondary: {
            main: '#d3d3d3'
        }
    },
    typography: {
        button: {
            textTransform: 'none'
        }
    }
})

axios.defaults.baseURL = 'http://localhost:4000/graphql'

function MyApp ({ Component, pageProps }) {
    return (<Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <div>
                <NavBar/>
                <Component {...pageProps} />
            </div>
        </MuiThemeProvider>
    </Provider>)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
