import { useCallback, useEffect, useState } from 'react';
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


export interface Photo {
    id: number;
    src: string;
    date: string;
    title: string;
    unsaved?: boolean;
}
import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { deletePhoto, insertPhoto, updatePhoto } from '@/components/features/items/photos/actions-photos';
import { useToast } from '@/components/ui/use-toast';
import { convertUnixToUtc } from '../system/date-time/convert-unix-utc';


const PhotoComponent = ({ linkid, photos, setPhotos }: { linkid?: number, photos: Photo[], setPhotos: (p: any) => {} }) => {
    // const [photos, setPhotos] = useState<Photo[]>([]);
    // const [expandedPhotoId, setExpandedPhotoId] = useState<number | null>(null);
    const [showCamera, setShowCamera] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast()


    const handleAddPhoto = (photoSrc: string) => {
        console.log("xx-handleAddPhoto",)
        const newPhoto: Photo = {
            id: -1 * ((photos?.at(-1)?.id) ?? 0 + 1),
            src: photoSrc,
            title: '',
            date: Date.now().toString(),
            unsaved: true
        };
        setPhotos([...photos, newPhoto]);
        setShowCamera(false)
        console.log("xx-newPhoto", newPhoto)
    };

    const handleDeletePhoto = async (photoId: number) => {
        const res = await deletePhoto(photoId)

        setPhotos(photos.filter(photo => photo.id !== photoId));
    };

    const handleSavePhoto = async (photoId: number) => {
        console.log("xx-savenewPhoto-id", photoId)
        const p = photos.find(p => p.id == photoId)
        if (p) {
            if (p.id < 0) {
                console.log("xx-saveing-id", photoId)
                const res = await insertPhoto(p.src, p.title, p.date, linkid,)
                toast({
                    title: "Saved photo:",
                    description: "id-" + p.id,
                })
                p.id = res.lastInsertRowid
                p.unsaved = false
                // console.log("saved", p.id,photos)

                setPhotos([...photos]);
            } else {
                const res = updatePhoto(p.id, p.title)

                if ((await res).success) {
                    p.unsaved = false
                    // console.log("saved", p.id,photos)

                    setPhotos([...photos]);

                    toast({
                        title: "Updated photo:",
                        description: "id-" + p.id,
                    })
                }
            }

        }
    };

    const handleCaptionChange = (photoId: number, caption: string) => {
        //console.log("xx-pchange evt", photos)
        const p = photos.find(p => p.id == photoId)
        // console.log("xx-2pchange evt", photos)
        if (p) {

            p.title = caption
            p.unsaved = true
            setPhotos([...photos])
        }


        // setPhotos();
    }

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

            <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <div className="flex flex-col gap-2">
                {photos.map(photo => (
                    <div key={photo.id} className="">
                        <div className="flex justify-center w-full">
                            <img src={photo.src} alt={photo.title} />
                        </div>
                        <div className="flex justify-between my-2 gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">

                                <Label>Title:</Label>
                                <Input
                                    type="text"
                                    placeholder='title...'
                                    value={photo.title}
                                    onChange={e => handleCaptionChange(photo.id, e.target.value)}
                                    className='border-2 border-red-100 w-[30rem]'
                                />
                                <Label>Date/Time:</Label>
                                {/* <Label>{ photo.date}</Label> */}
                                <Label>{convertUnixToUtc(Number(photo.date))}</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button onClick={() => handleDeletePhoto(photo.id)}>Delete</Button>
                                {photo.unsaved && <Button onClick={() => handleSavePhoto(photo.id)}>Save</Button>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex gap-2 mt-8">
                <Dialog>
                    <DialogTrigger asChild >
                        <Button variant="destructive"> Open Camera</Button>
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
                <Button onClick={handleAttachPhoto}>Attach Photo</Button>
            </div>
        </div>
    );
};

export default PhotoComponent;