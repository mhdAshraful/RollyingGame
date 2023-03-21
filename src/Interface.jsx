import { useKeyboardControls } from '@react-three/drei'
import { addEffect, useFrame } from '@react-three/fiber'
import React, { useEffect, useRef } from 'react'
import useGame from './Experience/Stores/useGame'


const Interface = () => {

    const forward = useKeyboardControls((state) => state.forward)
    const backward = useKeyboardControls((state) => state.backward)
    const leftward = useKeyboardControls((state) => state.leftward)
    const rightward = useKeyboardControls((state) => state.rightward)
    const jump = useKeyboardControls((state) => state.jump)

    const restartgame = useGame((state) => state.restart)
    let phase = useGame((state) => state.phase)
    const timeRef = useRef();




    // addEffect
    useEffect(() => {
        const unsubEffect = addEffect(() => {

            const state = useGame.getState()
            let ellapsedTime = 0
            if (state.phase === "playing") {
                ellapsedTime = Date.now() - state.startTime
            } else if (state.phase === "ended") {
                ellapsedTime = state.endTime - state.startTime
            }
            ellapsedTime /= 1000 * 60;
            ellapsedTime = ellapsedTime.toFixed(2)

            if (timeRef.current) {
                return timeRef.current.textContent = ellapsedTime
            }

        })


        return () => {
            unsubEffect()
        }
    }, [])


    return (

        <div className='interface' >
            <h1 ref={timeRef} className='time' >0.00</h1>

            {
                phase === "ended" ?
                    <h2 className='restart' onClick={restartgame} >RE-START</h2>
                    : null
            }


            {/* controls */}
            <div className="controls">
                <div className="row">
                    <div className={`key ${forward ? "active" : ""}`} ></div>
                </div>
                <div className="row">
                    <div className={` key ${leftward ? "active" : ""} `}  ></div>
                    <div className={` key  ${backward ? "active" : ""} `}  ></div>
                    <div className={` key ${rightward ? "active" : ""} `}  ></div>
                </div>
                <div className="row">
                    <div className={`key large ${jump ? "active" : ""} `}  ></div>
                </div>
            </div>
        </div>
    )
}

export default Interface