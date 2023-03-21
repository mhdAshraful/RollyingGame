import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience/Experience.jsx'
import Interface from './Interface.jsx'

export default function App() {
  // console.log('app')
  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >

      <Canvas
        shadows
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          stencil: true,
          depth: true
        }}
        camera={{
          fov: 35,
          near: 0.1,
          far: 1000,
          position: [3, 15, 20]
        }}
      >

        <Experience />
      </Canvas>
      <Interface />
    </KeyboardControls>
  )
}


