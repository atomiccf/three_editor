import React, {useState} from "react";
import style from './FileDropdownMenu.module.css'
import {FileDropdownNewSideMenu} from "../FileDropdownNewSideMenu/FileDropdownNewSideMenu.tsx";

interface FileDropdownMenuProps {
    isActive: boolean
}

export const FileDropdownMenu: React.FC<FileDropdownMenuProps> = ({isActive}) => {
    const FileDropdownMenuItems = ['New', 'Open', 'Save', 'Import', 'Export'];
    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

    const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
        setActiveMenuItem(event.currentTarget.id);
    };

    const handleMouseLeave = () => {
        setActiveMenuItem(null);
    };
    return (
        <ul className={isActive ? `${style.fd_menu_show}` : `${style.fd_menu}`}>
            {FileDropdownMenuItems.map((item) => (
                <li
                    key={item}
                    id={item}
                    className={style.fd_menu_item}
                    role="menuitem"
                    tabIndex={0}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {item}
                    {activeMenuItem === 'New' && item === 'New' && (
                        <FileDropdownNewSideMenu isActive={true}/>
                    )}
                </li>
            ))}
        </ul>
    )
}
