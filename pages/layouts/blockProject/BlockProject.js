import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSpring, animated } from 'react-spring'

function BlockProject ({ data, add, i }) {
    const [datas, setDatas] = useState({ idProject: '', titleProject: '', imgProject: '', language: '' })
    const router = useRouter()
    const withAnimation = i * 1000
    const [style, animate] = useSpring(() => ({ transform: 'translateY(' + (withAnimation || 100) + 'px)', opacity: 0 }))
    useEffect(() => {
        setDatas(data)
        animate({ transform: 'translateY(0px)', opacity: 1 })
    }, [data])
    const sendProjectDetails = (id) => {
        if (typeof id === 'object') {
            return router.push('/ProjectsDetails')
        }
        return router.push('/ProjectsDetails?id=' + id)
    }
    const { idProject, titleProject, imgProject, language } = datas
    return (
        <animated.div style={style} className='BlockProject shadow-1'>
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
                    </div>) : (
                        <div onClick={() => sendProjectDetails(idProject)}> {/* eslint-disable-line */}
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
        </animated.div>
    )
}

export default BlockProject
