import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Animation from './layouts/animation/Animation'

export default function Home () {
    const [hover, setHover] = useState(false)
    const [deg, setDeg] = useState(20)
    const [mouseHover, mouseHoverBtn] = useState(false)
    useEffect(() => {
        if (hover) {
            setDeg(0)
        } else {
            setDeg(20)
        }
    }, [hover])

    useEffect(() => {
        console.log('mouseHover', mouseHover)
    }, [mouseHover])

    return (
        <div className="container">
            <Head>
                <title>Porte-bot</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="/index.css" />
            </Head>
            <main>
                <div className='Home'>
                    <div className='center'>
                        <div
                            style={{ display: mouseHover ? 'none' : '' }}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                            className='image'>
                            <img src='/me.jpg' alt='me'/>
                            <div
                                className={hover ? 'rotateSlow1hover' : 'rotateSlow1' }
                                style={{
                                    transform: 'translate(-50%, -50%) rotate(' + deg + 'deg)',
                                    height: hover ? 0 : 63
                                }}
                            ></div>
                            <div
                                className={hover ? 'rotateSlow2hover' : 'rotateSlow2' }
                                style={{
                                    transform: 'translate(-50%, -50%) rotate(-' + deg + 'deg)',
                                    height: hover ? 0 : 63
                                }}
                            ></div>
                        </div>
                        <p>Full stack devellopeur React</p>
                        <p className='ligne'>
                            <p className='widthAnim'></p>
                            <p className='widthAnim'></p>
                        </p>
                        <Animation>
                            <div
                                className='btnBottom'
                                onMouseEnter={() => mouseHoverBtn(true)}
                                onMouseLeave={() => mouseHoverBtn(false)}
                                style={{
                                    height: mouseHover ? 400 : 43 
                                }}
                            >
                                <Link
                                    prefetch
                                    href='/Projects'
                                >
                        Voir touts mes projets
                                </Link>
                            </div>
                        </Animation>
                    </div>
                </div>
            </main>
        </div>
    )
}
