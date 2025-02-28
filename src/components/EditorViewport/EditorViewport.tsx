import React from 'react'
import { useThree } from '@react-three/fiber'
import { OrbitControls, TransformControls, Grid, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { db } from '../../../db.ts'
import {useEffect,  useState} from 'react'
import * as THREE from 'three';
import {EffectRenderer} from "../EffectRenderer/EffectRenderer.tsx";


type CameraObject = {
    position: { x: number; y: number; z: number };
    aspect: number;
    far: number;
    filmGauge: number;
    filmOffset: number;
    focus: number;
    fov: number;
    layers: number;
    matrix: number[];
    name: string;
    near: number;
    type: string;
    up: {
        x: number;
        y: number;
        z: number;
    };
    uuid: string;
    zoom: number;
};

export const EditorViewport: React.FC = () => {
    const [selected,] = useState()
    const [transformMode, ] = useState< 'translate' | 'scale' | 'rotate' >('translate')
    const { camera } = useThree<{
        camera: THREE.PerspectiveCamera;
    }>()

    const onChange = () => {
        const newCameraState:CameraObject = {
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
            // @ts-expect-error need type fix
           db.state.update(1, { camera: newCameraState });
        }

    }
/*
    const handleClick = (e) => {
        e.stopPropagation()
        setSelected(e.object)
    }*/

    // set camera into db
    useEffect(() => {
        db.state.count().then((value) => {
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
    }, []);

    useEffect(() => {
        db.state.get(1).then((dataBase) => {
            if (!dataBase || !dataBase.camera) return;

            // @ts-expect-error need type fix
            const savedCamera:CameraObject = dataBase.camera;
            camera.position.set(savedCamera.position.x, savedCamera.position.y, savedCamera.position.z);
            camera.aspect = savedCamera.aspect;
            camera.far = savedCamera.far;
            camera.filmGauge = savedCamera.filmGauge;
            camera.filmOffset = savedCamera.filmOffset;
            camera.focus = savedCamera.focus;
            camera.fov = savedCamera.fov;
            camera.layers.mask = savedCamera.layers;
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






