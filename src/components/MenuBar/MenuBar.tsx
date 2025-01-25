import React, { useState } from "react";
import style from './MenuBar.module.css';
import { FileDropdownMenu } from "../FileDropdownMenu/FileDropdownMenu.tsx";

export const MenuBar: React.FC = () => {
    const [activeMenuItem, setActiveMenuItem] = useState<string | null>(null);

    const handleMouseEnter = (event: React.MouseEvent<HTMLLIElement>) => {
        setActiveMenuItem(event.currentTarget.id);
    };

    const handleMouseLeave = () => {
        setActiveMenuItem(null);
    };

    const menuItems = ['File', 'Edit', 'Add', 'View', 'Help'];

    return (
        <nav
            className={style.menu_bar}
            role="navigation"
            aria-label="Main menu"
            onMouseLeave={handleMouseLeave}
        >
            <ul
                className={style.upper_menu}
                role="menubar"
                aria-orientation="horizontal"
            >
                {menuItems.map((item) => (
                    <li
                        key={item}
                        id={item}
                        className={style.upper_menu_item}
                        role="menuitem"
                        tabIndex={0}
                        onMouseEnter={handleMouseEnter}
                    >
                        {item}
                        {activeMenuItem === 'File' && item === 'File' && (
                            <FileDropdownMenu isActive={true} />
                        )}
                    </li>
                ))}
            </ul>
        </nav>
    );
};
