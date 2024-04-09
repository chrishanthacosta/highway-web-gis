import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button"

interface CameraComponentProps {
    // Add any other props your component might need
    onPhotoCapture: (photoSrc: string) => void;
}
import Webcam from 'react-webcam';

const handleCancel = () => {

}

function CameraComponent({ onPhotoCapture }: CameraComponentProps) {
    const [capturedPhoto, setcapturedPhoto] = useState<boolean>(false)
    const [photoSrc, setphotoSrc] = useState<string>("")
    const [showPhoto, setshowPhoto] = useState<boolean>(false)


    const webcamRef = useRef<Webcam>(null);

    const captureFrame = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            //onPhotoCapture(imageSrc);
            setcapturedPhoto(true)
            setphotoSrc(imageSrc)
        }
    };

    useEffect(() => {

        if (photoSrc != "") {
            setshowPhoto(true)
        }

    }, [photoSrc])

    const handleAdd = () => {
        onPhotoCapture(photoSrc)
        setshowPhoto(false)
    }
    const handleCancel = () => {

        setshowPhoto(false)
    }


    const getPhotoPreview = () => {
        //console.log("ee1-photoSrc", photoSrc)
        return (
            <>
                {photoSrc == "" ? null :
                    <div>
                        <Image src={photoSrc} width="400" height="400" alt="photo" />
                        <div className="flex gap-2 m-2">
                            <Button type="button" onClick={handleAdd}>Add</Button>
                            <Button type="button" onClick={handleCancel}>Cancel</Button>
                        </div>
                    </div>
                }
            </>

        )
    }
    const getCamera = () => {

        return (
            <>
                <div className="flex flex-col gap-2">
                    < Webcam

                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: 'environment' }}
                        screenshotQuality={0.9}
                    />
                    <Button type="button" onClick={captureFrame}>Capture Frame</Button>
                </div>
            </>)
    }


    return (
        <div>
            {showPhoto ? getPhotoPreview() : getCamera()}
        </div>
    );
}

export default CameraComponent;

