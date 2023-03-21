// import React from 'react'

import { useRef } from "react"
import { useHelper } from "@react-three/drei"
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber"

export default function Lights() {
    // console.log('lights')
    const lightref = useRef()
    useHelper(lightref, THREE.DirectionalLightHelper, 2);

    useFrame((state, delta) => {
        lightref.current.position.z = state.camera.position.z + 1;
        lightref.current.target.position.z = state.camera.position.z;
        lightref.current.updateMatrixWorld()
    })

    return <>
        <directionalLight
            ref={lightref}
            castShadow
            position={[-4, 4, 4]}
            intensity={1.5}
            shadow-mapSize={[1024, 1024]}
            shadow-camera-near={0.1}
            shadow-camera-far={40}
            shadow-camera-top={40}
            shadow-camera-right={40}
            shadow-camera-bottom={- 40}
            shadow-camera-left={- 40}
        />

        <ambientLight intensity={0.2} />
    </>

}

