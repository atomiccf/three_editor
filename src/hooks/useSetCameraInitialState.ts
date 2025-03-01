import {useEffect} from "react";
import {db} from "../../db.ts";
import * as THREE from "three";

export const useSetCameraInitialState = (camera: THREE.PerspectiveCamera) => {
    useEffect(() => {
        console.log('camera', camera);
        const cameraState = {
            id: 1,
            camera: {
                    position: {
                        x: camera.position.x,
                        y: camera.position.y,
                        z: camera.position.z,
                    },
                    aspect: camera.aspect,
                    far: camera.far,
                    filmGauge: camera.filmGauge,
                    filmOffset: camera.filmOffset,
                    focus: camera.focus,
                    fov: camera.fov,
                    matrix: Array.from(camera.matrix.elements),
                    name: camera.name,
                    near: camera.near,
                    type: camera.type,
                    up: {
                        x: camera.up.x,
                        y: camera.up.y,
                        z: camera.up.z,
                    },
                    uuid: camera.uuid,
                    zoom: camera.zoom,
                }
        };

        db.state.count().then((value: number) => {
            if (value === 0) {
                db.state.add(cameraState).catch(error => {
                    if (error.name !== 'ConstraintError') {
                        console.error('Failed to store camera state:', error);
                    }
                });
            }
        });

    }, [camera]);
}
