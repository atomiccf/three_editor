import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { EditorViewport } from "../EditorViewport/EditorViewport.tsx";

export const Editor:React.FC = () => {
    return (
        <Canvas
            camera={{ position: [0, 10, 20], fov: 50 }}
            shadows
            gl={{ preserveDrawingBuffer: true }}
        >
            <color attach="background" args={['#aaaaaa']} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            <Suspense fallback={null}>
                <EditorViewport />
            </Suspense>
        </Canvas>
    )
}
