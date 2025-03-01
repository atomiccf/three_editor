import React from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { useState } from 'react'
import * as THREE from 'three';
import { EffectRenderer } from "../EffectRenderer/EffectRenderer.tsx";
import { db } from '../../../db.ts'
import {useSetCameraInitialState} from "../../hooks/useSetCameraInitialState.ts";
import {useSetCameraSavedState} from "../../hooks/useSetCameraSavedState.ts";

export const EditorViewport: React.FC = () => {
    const [selected,] = useState()
    const [transformMode, ] = useState< 'translate' | 'scale' | 'rotate' >('translate')
    const { camera } = useThree<{camera:THREE.PerspectiveCamera}>()

    const onChange = () => {
        const newCameraState = {
            position: camera.position,
            aspect: camera.aspect,
            far: camera.far,
            filmGauge: camera.filmGauge,
            filmOffset: camera.filmOffset,
            focus: camera.focus,
            fov: camera.fov,
            matrix: [...camera.matrix.elements],
            name: camera.name,
            near: camera.near,
            type: camera.type,
            up: { ...camera.up },
            uuid: camera.uuid,
            zoom: camera.zoom,
        };

       const dataBase = db.state.get(1)

       if (JSON.stringify(dataBase) !== JSON.stringify(newCameraState)) {
           db.state.update(1, { camera: newCameraState });
        }

    }
/*
    const handleClick = (e) => {
        e.stopPropagation()
        setSelected(e.object)
    }*/
    useSetCameraInitialState(camera)

    useSetCameraSavedState(camera)

    return (
        <>
            <OrbitControls makeDefault onChange={onChange}/>
            {selected && (
                <TransformControls
                    object={selected}
                    mode={transformMode}
                />
            )}
            <Grid args={[20, 20]} sectionColor={'red'}/>
            <GizmoHelper
                alignment="bottom-right"
                margin={[80, 80]}
            >
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
            </GizmoHelper>
            <EffectRenderer />
        </>
    )
}






