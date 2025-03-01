// db.ts
import Dexie, { Table } from 'dexie';

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


interface State {
    id?: number;
    camera: CameraObject;
}


class ThreeEditorDB extends Dexie {
    state!: Table<State, number>;

    constructor() {
        super('three-editor');
        this.version(1).stores({
            state: '++id',
        });
    }
}


const db = new ThreeEditorDB();

export type { State };
export { db };
