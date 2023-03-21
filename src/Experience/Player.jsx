import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { RigidBody, useRapier } from '@react-three/rapier'
import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import useGame from './Stores/useGame';


const Player = () => {
    const ballRf = useRef();
    const [subscribeKeys, getKeys] = useKeyboardControls();
    const { rapier, world } = useRapier()

    // world is r3f world not physics world. 
    // to get access to physics worls we need to access worls.raw()
    const rapierWorld = world.raw() //we are going to test against the world for ray intersection


    const start = useGame((state) => state.start)
    const restart = useGame((state) => state.restart)
    const end = useGame((state) => state.end)
    const blocksCount = useGame((state) => state.blocksCount)

    const jump = () => {
        // console.log("jump");
        const origin = ballRf.current.translation()
        // console.log("origin", origin);
        origin.y -= 0.31;
        const direction = { x: 0, y: -1, z: 0 };  // direction vec3
        const ray = new rapier.Ray(origin, direction);
        const hit = rapierWorld.castRay(ray, 10, true); //consider everything as solid
        // console.log(hit.toi);

        if (hit.toi < 0.15) {
            ballRf.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
        }
    }

    const reset = () => {
        console.log(`
            %c 
            In this reset we are going to call three function 
            which will be responsibe for resetting all forces 
            and translation to applied to the ball.

            * setTranslation (to put back to origin)
            * setLinvel  ( to remove any translation force)
            * setAngvel ( to remove torque/angular force)
            
        `, "color: #3232f4; font-family:monospace; font-size: 1rem")
        ballRf.current.setTranslation({ x: 0, y: 1, z: 0 })
        ballRf.current.setLinvel({ x: 0, y: 0, z: 0 })
        ballRf.current.setAngvel({ x: 0, y: 0, z: 0 })


    }


    useEffect(() => {
        const unsubGame = useGame.subscribe(
            (state) => { return state.phase },
            (phase) => {
                if (phase === "ready") {
                    reset()
                }
            }
        )

        const unsubs = subscribeKeys(
            (state) => {
                return state.jump
            }, //selector funciton
            (value) => {
                if (value) { jump(); }
            } // Listener function
        )

        const unsubKeyPress = subscribeKeys(
            (state) => {
                start();
                return state
            }
        )



        return (() => {
            unsubs()
            unsubKeyPress()
            unsubGame()
        })

    }, [])



    const [smoothCameraPosition] = useState(() => new THREE.Vector3(20, 20, 20))
    const [smoothCameraTarget] = useState(() => new THREE.Vector3())

    useFrame((state, delta) => {

        /**
         * Controls
         */

        const { forward, backward, leftward, rightward, jump } = getKeys()

        const impulse = { x: 0, y: 0, z: 0 }
        const torque = { x: 0, y: 0, z: 0 }

        const impulseStrength = delta * 0.6;
        const torqueStrength = delta * 0.2;


        if (forward) {
            impulse.z -= impulseStrength;
            torque.x -= torqueStrength;  //rotation through axix
        }
        if (rightward) {
            impulse.x += impulseStrength;
            torque.z -= torqueStrength; //rotation on axis
        }
        if (backward) {
            impulse.z += impulseStrength;
            torque.x += torqueStrength;  //rotation on axis
        }
        if (leftward) {
            impulse.x -= impulseStrength;
            torque.z += torqueStrength;  //rotation on axis
        }

        ballRf.current.applyImpulse(impulse);
        ballRf.current.applyTorqueImpulse(torque);

        /**
         * Camera
         */
        const ballPosition = ballRf.current.translation();
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(ballPosition);
        cameraPosition.z += 8;
        cameraPosition.y += 3;

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(ballPosition);
        cameraTarget.y += 1


        smoothCameraPosition.lerp(cameraPosition, 10 * delta);
        smoothCameraTarget.lerp(cameraTarget, 10 * delta);

        state.camera.position.copy(smoothCameraPosition);
        state.camera.lookAt(smoothCameraTarget);

        /**
         * phases
         */
        if (ballPosition.z < -(blocksCount * 4 + 2)) {
            end()
        }

        if (ballPosition.y < -1) {
            restart()
        }


    })


    return (
        <>
            <RigidBody ref={ballRf} position={[0, 0.01, 0]} colliders="ball" restitution={0.2} linearDamping={0.5} angularDamping={0.5} friction={1} >
                <mesh castShadow receiveShadow >
                    <icosahedronGeometry args={[0.3, 1]} />
                    <meshStandardMaterial flatShading color={"mediumpurple"} />
                </mesh>
            </RigidBody>
        </>
    )
}

export default Player