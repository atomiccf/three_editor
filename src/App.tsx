import React from 'react'
import './App.css'
import {MenuBar} from "./components/MenuBar/MenuBar.tsx";

import {Editor} from "./components/Editor/Editor.tsx";

export const App: React.FC = () => {


    return (
        <>
            <MenuBar/>
            <Editor/>
        </>
    )
}


