import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface CameraComponentProps {
    // Add any other props your component might need
}

function CameraComponent({ /* props */ }: CameraComponentProps) {
    const [imageDataURL, setImageDataURL] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play(); // Start the camera feed
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const captureFrame = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0);
            const dataURL = canvas.toDataURL('image/jpeg');
            setImageDataURL(dataURL);
        }
    };

    return (
        <div>
            <button onClick={startCamera}>Start Camera</button>
            {/* Hidden video element to play the stream */}
            <video ref={videoRef} style={{ display: 'none' }} autoPlay />

            <button type="button" onClick={captureFrame}>Capture Frame</button>

            {imageDataURL && (
                <Image
                    src={imageDataURL}
                    alt="Camera Frame"
                    width={300}
                    height={200}
                />
            )}
        </div>
    );
}

export default CameraComponent;

