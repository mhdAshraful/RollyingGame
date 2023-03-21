import { DepthOfField, EffectComposer, SSR } from '@react-three/postprocessing'
import React from 'react'

export default function PostProcessing() {


    return (
        <EffectComposer>
            {/* <SSR
                intensity={0.45}
                exponent={20}
                distance={5}
                fade={10}
                roughnessFade={1}
                thickness={10}
                ior={0.25}
                maxRoughness={1}
                maxDepthDifference={10}
                blend={0.45}
                correction={1}
                correctionRadius={1}
                blur={0}
                blurKernel={1}
                blurSharpness={10}
                jitter={0.75}
                jitterRoughness={0.2}
                steps={20}
                refineSteps={5}
                missedRays={true}
                useNormalMap={true}
                useRoughnessMap={true}
                resolutionScale={1}
                velocityResolutionScale={1} /> */}

            <SSR
                intensity={0.2}
                exponent={0.5}
                distance={5}
                fade={2}
                roughnessFade={0.5}
                thickness={5}
                ior={0.1}
                maxRoughness={0.5}
                maxDepthDifference={5}
                blend={0.2}
                correction={0.5}
                correctionRadius={0.5}
                blur={0}
                blurKernel={1}
                blurSharpness={1}
                jitter={0.5}
                jitterRoughness={0.1}
                steps={10}
                refineSteps={2}
                missedRays={true}
                useNormalMap={false}
                useRoughnessMap={false}
                resolutionScale={0.5}
                velocityResolutionScale={0.5}
            />



            <DepthOfField
                focalLength={0.01}
                focusDistance={0.4}
                bokehScale={2}
            />
        </EffectComposer>
    )
}