import * as THREE from "three";
import {useEffect} from "react";
import {db} from "../../db.ts";


export const useSetCameraSavedState = (camera: THREE.PerspectiveCamera) => {
    useEffect(() => {
        const setSavedCamera = async () => {
        const dataBase =  await db.state.get(1)
        const savedCamera: THREE.PerspectiveCamera = dataBase?.camera as unknown as THREE.PerspectiveCamera;
        console.log('camera',camera)
        console.log('savedCamera',savedCamera)
            camera.position.set(savedCamera.position.x, savedCamera.position.y, savedCamera.position.z);
            camera.aspect = savedCamera.aspect;
            camera.far = savedCamera.far;
            camera.filmGauge = savedCamera.filmGauge;
            camera.filmOffset = savedCamera.filmOffset;
            camera.focus = savedCamera.focus;
            camera.fov = savedCamera.fov;
            camera.layers = savedCamera.layers;
            camera.name = savedCamera.name;
            camera.near = savedCamera.near;
            camera.up.set(savedCamera.up.x, savedCamera.up.y, savedCamera.up.z);
            camera.uuid = savedCamera.uuid;
            camera.zoom = savedCamera.zoom;

            camera.updateProjectionMatrix();
            camera.updateMatrixWorld();
        }
        setSavedCamera()
    }, [camera]);
}
