 export type CameraObject = {
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
