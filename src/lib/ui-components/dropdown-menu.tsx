import React, { useState } from 'react';
// import './Dropdown.css'; // Add your Tailwind CSS file
import Link from 'next/link';

interface DropdownProps {
    label: string;
    menuData: { title: string, menuItems: { title: string, href: string }[] };
    selectedIndex: number;
    index:number;
    handleItemClick:(n:number)=>{}
}



function Dropdown({ label, menuData,handleItemClick,index, selectedIndex}: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleToggleBlur = () => {
        if(!isHovering){
            setIsOpen(!isOpen);
        }
       
    };
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
       
        setIsHovering(false);
    };

    return (
        <div className={`relative active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500  ${selectedIndex === index ? " border-b-4 border-red-800" : ""}`} onClick={() => { handleItemClick(index) }} onBlur={handleToggleBlur}> {/* Tailwind for positioning */}
            <button
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-100 rounded shadow"
                onClick={handleToggle}
            >
                {label}
            </button>
            {isOpen && (
                <ul className="absolute top-full left-0 w-full bg-white shadow-lg z-10 " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    {menuData.menuItems.map((menuItem, index) => (
                        <li key={index}>
                            <Link
                                href={menuItem.href}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                 onClick={handleToggle}
                            >
                                {menuItem.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown;
