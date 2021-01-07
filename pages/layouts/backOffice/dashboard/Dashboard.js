import React, { useEffect } from 'react'
import {
    Visibility,
    ThumbUp,
    Storage,
    Memory
} from '@material-ui/icons'

import { animated, useSpring } from 'react-spring'

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || ''

function Block ({ Img, value, title }) {
    const [style, animate] = useSpring(() => ({ transform: 'scale(0)', opacity: 0 }))
    const [styleChild, animateChild] = useSpring(() => ({ transform: 'scale(0)', opacity: 0 }))
    const [styleTextTop, animateTextTop] = useSpring(() => ({ transform: 'translateY(100px)', opacity: 0 }))
    const [styleTextBottom, animateTextBottom] = useSpring(() => ({ transform: 'translateY(-100px)', opacity: 0 }))
    useEffect(() => {
        animate({ transform: 'scale(1)', opacity: 1 })
        setTimeout(() => animateChild({ transform: 'scale(1)', opacity: 1 }), 1000)
        setTimeout(() => {
            animateTextTop({ transform: 'translateY(0px)', opacity: 1 })
            animateTextBottom({ transform: 'translateY(0px)', opacity: 1 })
        }, 2000)
    }, [animate])

    return <animated.div style={style} className='BlockDashboard'>
        <div className='shadow-2'>
            {/* <img src={props.img} alt='imageProject'/> */}
            <animated.div style={styleChild}>
                <animated.span style={styleTextTop}>
                    <Img style={{ fontSize: 30 }}/>
                </animated.span>
            </animated.div>
            <animated.h1 style={styleTextBottom}>{ value }</animated.h1>
            <animated.h1 style={styleTextTop}>{ title }</animated.h1>
        </div>
    </animated.div>
}

function Dashboard () {
    return (
        <div className='Dashboard'>
            <Block
                // img={ prefix + '/iron.png'}
                Img={Visibility}
                title='Visiteur'
                value={100}
            />
            <Block
                // img={ prefix + '/iron.png'}
                Img={ ThumbUp }
                title="J'aime"
                value={100}
            />
            <Block
                // img={ prefix + '/iron.png'}
                Img={Memory}
                title='Ram'
                value={100}
            />
            <Block
                // img={ prefix + '/iron.png'}
                Img={Storage}
                title='Stockage'
                value={100}
            />
        </div>
    )
}

export default Dashboard
