import Head from 'next/head'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
    getAllProject
} from './utils/Utils'

import BlockProject from './layouts/blockProject/BlockProject'

const language = [
    { idLanguage: 1, urlLanguage: '/', imgLanguage: '' }, { idLanguage: 2, urlLanguage: '/', imgLanguage: '' }, { idLanguage: 3, urlLanguage: '/', imgLanguage: '' }
]

function Projects (props) {
    const projects = useSelector(state => state.projects.datas)
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (props.data) {
            dispatch({ type: 'INIT_PROJECTS', data: props.data })
        }
    }, [props.data, dispatch])

    return (
        <div className='Projects'>
            <Head>
                <title>Porte-bot | Projects</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/index.css" />
            </Head>
            <div className='listProjects'>
                {
                    projects && projects.map((e) => {
                        return (
                            <div
                                key={e.idProject}
                            >
                                <BlockProject
                                    data={e}
                                    language={[
                                        {
                                            idLanguage: 1,
                                            urlLanguage: '/',
                                            imgLanguage: ''
                                        }
                                    ]}
                                    add={false}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <BlockProject
                add={true}
                data={language}
            />
        </div>
    )
}

Projects.getInitialProps = async (ctx) => {
    const data = await getAllProject()
    return { data }
}

export default Projects
