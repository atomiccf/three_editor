import React from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei'
import {useEffect,  useState} from 'react'
import * as THREE from 'three';
import { EffectRenderer } from "../EffectRenderer/EffectRenderer.tsx";
import { CameraObject } from "./EditorViewport.types.ts";
import { db } from '../../../db.ts'



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
            layers: camera.layers.mask,
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

    useEffect(() => {
        db.state.count().then((value: number) => {
            if (value > 0) {
                return
            } else {
                db.state.add({
                    id:1,
                    camera: {
                        object: {
                            position: camera.position,
                            aspect: camera.aspect,
                            far: camera.far,
                            filmGauge: camera.filmGauge,
                            filmOffset: camera.filmOffset,
                            focus: camera.focus,
                            fov: camera.fov,
                            layers: camera.layers.mask,
                            matrix: camera.matrix.elements,
                            name: camera.name,
                            near: camera.near,
                            type: camera.type,
                            up: camera.up,
                            uuid: camera.uuid,
                            zoom: camera.zoom,
                        }
                    }
                });
            }
        })
    });

    useEffect(() => {
        db.state.get(1).then((dataBase:{camera:CameraObject}) => {
            if (!dataBase || !dataBase.camera) return;


            const savedCamera = dataBase.camera;
            camera.position.set(savedCamera.position.x, savedCamera.position.y, savedCamera.position.z);
            camera.aspect = savedCamera.aspect;
            camera.far = savedCamera.far;
            camera.filmGauge = savedCamera.filmGauge;
            camera.filmOffset = savedCamera.filmOffset;
            camera.focus = savedCamera.focus;
            camera.fov = savedCamera.fov;
            camera.layers.mask = savedCamera.layers.mask;
            camera.matrix.fromArray(savedCamera.matrix);
            camera.name = savedCamera.name;
            camera.near = savedCamera.near;
            camera.up.set(savedCamera.up.x, savedCamera.up.y, savedCamera.up.z);
            camera.uuid = savedCamera.uuid;
            camera.zoom = savedCamera.zoom;

            camera.updateProjectionMatrix();
            camera.updateMatrixWorld();
        });
    }, [camera]);

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
                alignment="bottom-right" // widget alignment within scene
                margin={[80, 80]} // widget margins (X, Y)
            >
            <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
            </GizmoHelper>
            <EffectRenderer/>
        </>
    )
}






