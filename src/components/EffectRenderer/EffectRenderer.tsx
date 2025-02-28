import {useThree} from "@react-three/fiber";
import {useEffect} from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export const EffectRenderer = () => {

    const {scene, gl} = useThree()
    useEffect(() => {
        const pmremGenerator = new THREE.PMREMGenerator(gl)
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture
    })

    return null
}
