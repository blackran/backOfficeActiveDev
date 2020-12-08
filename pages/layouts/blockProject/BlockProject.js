import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function BlockProject ({ data: { idProject, titleProject, imgProject, language }, add }) {
    const router = useRouter()
    const sendProjectDetails = (id) => {
        if (!id) {
            return router.push('/ProjectsDetails')
        }
        router.push('/ProjectsDetails/' + id)
    }
    return (
        <div className='BlockProject shadow-1'>
            {
                add
                    ? ( <div onClick={sendProjectDetails}>  {/* eslint-disable-line */}
                        <header>
                            <h1>{titleProject || 'Nouveau'}</h1>
                        </header>
                        <div className='image'>
                            <img src='/add-new-project.jpg' alt='image_language'/>
                        </div>
                        <div className='list_language'>
                            {
                                language && language.map((e, i) => {
                                    return <Link href='/' key={e.idLanguage} >
                                        <div className='language'>
                                            <img src='/add-new-project.jpg' alt='image_language'/>
                                        </div>
                                    </Link>
                                })
                            }
                        </div>
                        </div>) : (<div onClick={() => sendProjectDetails(idProject)}> {/* eslint-disable-line */}
                        <header>
                            <h1>{titleProject || 'Nouveau'}</h1>
                        </header>
                        <div className='image'>
                            <img src={imgProject} alt='image_project'/>
                        </div>
                        <div className='list_language'>
                            {
                                language && language.map((e, i) => {
                                    return <Link href={e.urlLanguage || '/'} key={e.idLanguage} >
                                        <div className='language'>
                                            <img src={e.imgLanguage} alt='image_language'/>
                                        </div>
                                    </Link>
                                })
                            }
                        </div>
                    </div>)
            }
        </div>
    )
}

export default BlockProject
