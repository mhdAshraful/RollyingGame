import { Float, Text, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

THREE.ColorManagement.enabled = false

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "#111111", metalness: 0, roughness: 0 })
const floor2Material = new THREE.MeshStandardMaterial({ color: "#222222", metalness: 0, roughness: 0 })
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "#ff0000", metalness: 0, roughness: 1 })
const wallMaterial = new THREE.MeshStandardMaterial({ color: "#887777", metalness: 0, roughness: 0 })


export const BlockStart = ({ position = [0, 0, 0] }) => {
    return <>
        <group position={position} >
            <Float floatIntensity={.65} rotationIntensity={0.85} >
                <Text
                    font='./bebas-neue-v9-latin-regular.woff'
                    fontSize={0.5}
                    lineHeight={1}
                    textAlign={"right"}
                    maxWidth={2}
                    position={[1, 1.1, 1]}
                    rotation-y={-0.6}
                >
                    Marbel Race
                    <meshBasicMaterial toneMapped={false} />
                </Text>
            </Float>

            {/* floor */}
            <mesh
                receiveShadow
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                geometry={boxGeometry}
                material={floor1Material}
            >
            </mesh>
        </group>

    </>
}

export const BlockEnd = ({ position = [0, 0, 0] }) => {

    const model = useGLTF('./hamburger.glb')
    // console.log('burg', model)


    model.scene.children.forEach((mesh) => {
        mesh.castShadow = true
    })

    return <>
        <group position={position} >
            <Text
                font='./bebas-neue-v9-latin-regular.woff'
                fontSize={0.3}
                lineHeight={1}
                position={[0, 1.5, -1.2]}
            >
                FINISH
                <meshBasicMaterial toneMapped />
            </Text>

            {/* floor */}
            <mesh
                receiveShadow
                position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]}
                geometry={boxGeometry}
                material={floor1Material}
            >
            </mesh>

            <RigidBody type='fixed' colliders="hull" restitution={0.2} friction={0} >

                <primitive object={model.scene} scale={0.1} />
            </RigidBody>

        </group>

    </>
}



export const BlockSpinner = ({ position = [0, 0, 0] }) => {

    const obstRef = useRef()

    const [speed] = useState(() => (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1))

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const rotation = new THREE.Quaternion()
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0))
        obstRef.current.setNextKinematicRotation(rotation);
    })

    return <>
        <group position={position} >

            {/* floor */}
            <mesh castShadow receiveShadow position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]} geometry={boxGeometry} material={floor2Material}
            >
            </mesh>

            {/* obstacle */}
            <RigidBody ref={obstRef} type='kinematicPosition' position={[0, 0.2, 0]}
                restitution={0.2}
                friction={0.05}>
                <mesh castShadow receiveShadow scale={[3.5, 0.3, 0.2]}
                    geometry={boxGeometry} material={obstacleMaterial}
                >
                </mesh>
            </RigidBody>

        </group>

    </>
}




export const Bars = ({ position = [0, 0, 0] }) => {
    const barRef = useRef()
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const y = Math.sin(time + timeOffset) + 1.5;
        barRef.current.setNextKinematicTranslation({
            x: position[0], y: position[1] + y, z: position[2]
        })
    })

    return <>
        <group position={position} >

            {/* floor */}
            <mesh receiveShadow position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]} geometry={boxGeometry} material={floor2Material}
            >
            </mesh>

            {/* obstacle */}
            <RigidBody ref={barRef} type='kinematicPosition' position={[0, 0.2, 0]}
                restitution={0.2}
                friction={0.05}>
                <mesh castShadow receiveShadow scale={[3.5, 0.3, 0.2]}
                    geometry={boxGeometry} material={obstacleMaterial}
                >
                </mesh>
            </RigidBody>

        </group>

    </>
}
export const Axes = ({ position = [0, 0, 0] }) => {
    const barRef = useRef()
    const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

    useFrame((state, delta) => {
        const time = state.clock.getElapsedTime();
        const x = Math.cos(time + timeOffset);
        barRef.current.setNextKinematicTranslation({
            x: position[0] + x, y: position[1] + 0.5, z: position[2]
        })
    })

    return <>
        <group position={position} >

            {/* floor */}
            <mesh receiveShadow position={[0, -0.1, 0]}
                scale={[4, 0.2, 4]} geometry={boxGeometry} material={floor2Material}
            >
            </mesh>

            {/* obstacle */}
            <RigidBody ref={barRef} type='kinematicPosition' position={[0, 0.2, 0]}
                restitution={0.2}
                friction={0.05}>
                <mesh castShadow receiveShadow scale={[1.5, 1.3, 0.2]}
                    geometry={boxGeometry} material={obstacleMaterial}
                >
                </mesh>
            </RigidBody>

        </group>

    </>
}

export const Bounds = ({ length = 1, counts }) => {
    return <>
        <RigidBody type='fixed' restitution={0.2} friction={0}>

            {/* left */}
            <mesh castShadow position={[2.2, 0.5, -length * 2 + 2]} geometry={boxGeometry} material={wallMaterial} scale={[0.3, 1.5, length * 4]} />

            {/* right */}
            <mesh castShadow position={[-2.2, 0.5, -length * 2 + 2]} geometry={boxGeometry} material={wallMaterial} scale={[0.3, 1.5, length * 4]} />

            {/* back */}
            <mesh castShadow position={[0, 0.5, - counts * 4 - 6]} geometry={boxGeometry} material={wallMaterial} scale={[4, 1.5, 0.3]} />

            <CuboidCollider args={[2, 0.1, 2 * length]} position={[0, -0.1, -length * 2 + 2]}
                restitution={0.2} friction={1}
            />

        </RigidBody>
    </>
}





export default function Level({ counts = 4, typ = [BlockSpinner, Axes, Bars], seed = 0 }) {
    // console.log('level');
    const blocks = useMemo(() => {
        const blocks = []

        for (let i = 0; i < counts; i++) {
            const obj = typ[Math.floor(Math.random() * typ.length)]
            blocks.push(obj);
        }

        return blocks;

    }, [counts, typ, seed])

    return <>
        {/* 
        // manual
        <BlockStart position={[0, 0, 4]} />
        <BlockSpinner position={[0, 0, 0]} />
        <Bars position={[0, 0, -4]} />
        <BlockSpinner position={[0, 0, -8]} />
        <Axes position={[0, 0, -12]} />
        <Bars position={[0, 0, -16]} />
        <BlockSpinner position={[0, 0, -18]} />
        <Axes position={[0, 0, -22]} />
        <BlockEnd position={[0, 0, -26]} /> */}


        {/* programatically */}
        <BlockStart position={[0, 0, 0]} />
        {blocks.map((Block, index) => {
            return <Block key={index} position={[0, 0, -(index + 1) * 4]} />
        })}
        <BlockEnd position={[0, 0, -(counts + 1) * 4]} />
        <Bounds length={counts + 2} counts={counts} />


    </>

}

