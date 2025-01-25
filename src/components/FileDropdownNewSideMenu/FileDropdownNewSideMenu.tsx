import React from 'react'
import style from "./FileDropdownNewSideMenu.module.css";

interface FileDropdownNewSideMenuProps {
    isActive: boolean
}

export const FileDropdownNewSideMenu: React.FC<FileDropdownNewSideMenuProps> = ({
                                                                                  isActive
                                                                              }) => {
    const FileDropdownNewSubMenuItems = ['Empty', 'Arcanoid', 'Camera', 'Particles', 'Pong', 'Shaders']
    return (
        <ul className={isActive ? `${style.fdnsm_menu_show}` : `${style.fdnsm_menu}`}>
            {FileDropdownNewSubMenuItems.map(item => (
                <li
                    key={item}
                    id={item}
                    className={style.fdnsm_menu_item}
                    role="menuitem"
                    tabIndex={0}
                >
                    {item}
                </li>
            ))}
        </ul>

    )
}
