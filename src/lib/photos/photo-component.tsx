import  { useState } from 'react';
import CameraComponent from './../camera/camera-component';
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"


interface Photo {
    id: number;
    src: string;
    caption: string;
}
import { useRef } from 'react';

const PhotoComponent = () => {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [expandedPhotoId, setExpandedPhotoId] = useState<number | null>(null);
    const [showCamera, setShowCamera] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAddPhoto = (photoSrc: string) => {
        const newPhoto: Photo = {
            id: Date.now(),
            src: photoSrc,
            caption: ''
        };
        setPhotos([...photos, newPhoto]);
        setShowCamera(false)
    };

    const handleDeletePhoto = (photoId: number) => {
        setPhotos(photos.filter(photo => photo.id !== photoId));
    };

    const handleExpandPhoto = (photoId: number) => {
        setExpandedPhotoId(photoId);
    };

    const handleCaptionChange = (photoId: number, caption: string) => {
        setPhotos(photos.map(photo => {
            if (photo.id === photoId) {
                return { ...photo, caption };
            }
            return photo;
        }));
    };

    const handleAttachPhoto = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const photoSrc = reader.result as string;
                handleAddPhoto(photoSrc);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline"> Open Camera</Button>
                   </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Photo...</DialogTitle>
                        <DialogDescription>
                            <CameraComponent onPhotoCapture={handleAddPhoto} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            {/* <Button onClick={() => setShowCamera(true)}>Add Photo</Button> */}
            <Button onClick={handleAttachPhoto}>Attach Photo</Button>
            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <div className="photo-grid">
                {photos.map(photo => (
                    <div key={photo.id} className={`photo ${expandedPhotoId === photo.id ? 'expanded' : ''}`}>
                        <img src={photo.src} alt={photo.caption} />
                        <input
                            type="text"
                            value={photo.caption}
                            onChange={e => handleCaptionChange(photo.id, e.target.value)}
                            className='border-2 border-red-400'
                        />
                        <Button onClick={() => handleDeletePhoto(photo.id)}>Delete</Button>
                        <Button onClick={() => handleExpandPhoto(photo.id)}>Expand</Button>
                    </div>
                ))}
            </div>
            {photos.length>0 && (<Dialog>
                <DialogTrigger asChild >
                    <Button variant="outline"> Open Camera</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Photo...</DialogTitle>
                        <DialogDescription>
                            <CameraComponent onPhotoCapture={handleAddPhoto} />
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>)}
        </div>
    );
};

export default PhotoComponent;