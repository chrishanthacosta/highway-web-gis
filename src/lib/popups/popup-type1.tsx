import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

interface PopupProps {
    children: React.ReactNode;
    trigger: React.ReactNode;
    onClose?: (c:number[]) => void;
}

const Popup: React.FC<PopupProps> = ({ children, trigger, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };

    return (
        <>
            {/* Trigger element. Customize with Tailwind classes */}
            {trigger && (
                <Button
                    className="  hover:bg-blue-200 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setIsOpen(true)}
                    type="button"
                >
                    {trigger}
                </Button>
            )}

            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="flex flex-col bg-white p-6 rounded-md shadow-md">
                        <button
                            className=" ml-auto text-gray-600 hover:text-gray-800 text-2xl"
                            // className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                            onClick={handleClose}
                        >
                            &times;
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Popup;
