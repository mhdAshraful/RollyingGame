// import React from 'react'

import { Physics } from '@react-three/rapier';
import Level, { Axes, Bars, BlockEnd, BlockSpinner, BlockStart } from './Level.jsx';
import Lights from './Lights.jsx'
import Player from './Player.jsx';
import PostProcessing from './PostProcessing.jsx';
import useGame from './Stores/useGame.jsx';

export default function Experience() {
    const blocksCount = useGame((state) => state.blocksCount)
    const seed = useGame((state) => state.blockSeed)
    return <>
        <color args={["hsl(211.76470588235293, 26.984126984126984%, 12.352941176470589%)"]} attach="background" />
        <Lights />

        <Physics>
            <Level counts={blocksCount} typ={[Axes, Bars, BlockSpinner]} seed={seed} />
            <Player />
        </Physics>

        <PostProcessing />
    </>

}
