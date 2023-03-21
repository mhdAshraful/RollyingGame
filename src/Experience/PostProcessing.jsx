import { DepthOfField, EffectComposer, SSR } from '@react-three/postprocessing'
import React from 'react'

export default function PostProcessing() {


    return (
        <EffectComposer>
            <SSR
                intensity={0.45}
                exponent={1}
                distance={10}
                fade={5}
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
                velocityResolutionScale={1} />
            <DepthOfField
                focalLength={0.01}
                focusDistance={0.4}
                bokehScale={2}
            />
        </EffectComposer>
    )
}