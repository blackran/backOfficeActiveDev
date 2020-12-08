import React from 'react'
import { config } from 'react-spring'
import { Spring } from 'react-spring/renderprops-universal'

function Animation ({ acienTranslateValue, translateValue }) {
    return (
        <div>
            <Spring
                from={{
                    opacity: 0,
                    transform: 'translateX(' + acienTranslateValue + 'px)'
                }}
                to={{
                    opacity: 1,
                    transform: 'translateX(' + translateValue + 'px)'
                }}
                config={ config.molasses }
            >
                {props =>
                    <p>Body</p>
                }
            </Spring>

        </div>
    )
}

export default Animation
