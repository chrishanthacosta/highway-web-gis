import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

interface CameraComponentProps {
    // Add any other props your component might need
    onPhotoCapture: (photoSrc: string) => void;
}
import  Webcam  from 'react-webcam';

 

function CameraComponent({ onPhotoCapture }: CameraComponentProps) {
    const webcamRef = useRef<Webcam>(null);

    const captureFrame = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            onPhotoCapture(imageSrc);
        }
    };

    return (
        <div>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{ facingMode: 'environment' }}
            />

            <Button type="button" onClick={captureFrame}>Capture Frame</Button>
            {/* <Button type="button" onClick={handleDownload}>Save</Button> */}

            {/* {imageDataURL && (
                <Image
                    src={imageDataURL}
                    alt="Camera Frame"
                    width={600}
                    height={400}
                />
            )} */}
        </div>
    );
}

export default CameraComponent;

