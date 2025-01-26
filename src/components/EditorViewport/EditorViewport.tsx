import React from 'react'
import { useThree, useFrame,  } from '@react-three/fiber'
import { OrbitControls, TransformControls, Grid, useCursor } from '@react-three/drei'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

import {RoomEnvironment} from "three/examples/jsm/environments/RoomEnvironment";

export const EditorViewport: React.FC = () => {
    const [selected, setSelected] = useState()
    const [transformMode, setTransformMode] = useState('translate')
    const { camera, scene, gl } = useThree()

    // 2. Обработка выбора объектов
    const handleClick = (e) => {
        e.stopPropagation()
        setSelected(e.object)
    }

    return (
        <>
            <OrbitControls makeDefault />

            {/* 3. Transform Controls */}
            {selected && (
                <TransformControls
                    object={selected}
                    mode={transformMode}
                    onObjectChange={(e) => {
                        // Обновление состояния редактора

                    }}
                />
            )}

            {/* 4. Сетка и окружение */}
            <Grid args={[20, 20]} sectionColor={'red'} />

            {/* 5. Вспомогательные элементы */}
            <axesHelper args={[5]} />

            {/* 6. Объекты сцены */}
           {/* <SceneObjects onObjectClick={handleClick} />*/}

            {/* 7. Настройки рендера */}
            <EffectRenderer />
        </>
    )
}

// 8. Компонент объектов сцены
/*function SceneObjects({ onObjectClick }) {
   /!* const objects = useStore(state => state.objects)*!/

    return objects?.map(obj => (
        <MeshObject
            key={obj.uuid}
            obj={obj}
            onClick={onObjectClick}
        />
    ))
}*/

// 9. Компонент меша с материалами
function MeshObject({ obj, onClick }) {
    const ref = useRef()
    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    useFrame(() => {
        // Обновление анимаций
        if (obj.animation) {
            ref.current.rotation.y += 0.01
        }
    })

    return (
        <mesh
            ref={ref}
            geometry={obj.geometry}
            position={obj.position}
            onClick={onClick}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <meshStandardMaterial
                color={obj.color}
                wireframe={obj.wireframe}
            />
        </mesh>
    )
}

// 10. Эффекты рендеринга
function EffectRenderer() {
   /* const shadingMode = useStore(state => state.shadingMode)*/
    const { scene, camera, gl } = useThree()

    useEffect(() => {
        // Настройка окружения
        const pmremGenerator = new THREE.PMREMGenerator(gl)
        scene.environment = pmremGenerator.fromScene(new RoomEnvironment()).texture
    }, [])

    useFrame(() => {
        // Логика патч-трассировки
      /*  if (shadingMode === 'realistic') {
            // Кастомная логика рендеринга
        }*/
    })

    return null
}



