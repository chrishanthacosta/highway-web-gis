
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useCallback, useEffect, useState } from "react"
import { GetPhoto, GetPhotoDetails } from "./actions-photos"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export const PhotoBrowser = ({ linkid }: { linkid: number }) => {

    const [photoDetails, setphotoDetails] = useState<any>([])
    const [currentphotoid, setcurrentphotoid] = useState<number>(0)
    const [currentphoto, setcurrentphoto] = useState<any>()

    const loadPhotoDetails = useCallback(async () => {

        if (linkid == 0 || linkid == null) {
            toast({
                title: "No link id found",
                description: ""

            })
            return
        }
        //check if already loaded



        const photoDetailsF = await GetPhotoDetails(linkid)
        console.log("qwerty1-photoDetailsF", linkid, photoDetailsF.data)
        setphotoDetails(photoDetailsF.data)



        //
    }, [linkid])

    useEffect(() => {
        loadPhotoDetails()
        if (photoDetails.length > 0) {
            setcurrentphotoid(photoDetails[0].id)
        }


    }, [])

    useEffect(() => {
        if (photoDetails.length > 0) {
            setcurrentphotoid(photoDetails[0].id)
        }

    }, [photoDetails])

    useEffect(() => {
        console.log("qwertyDD", currentphotoid)


        const fetchP = async () => {
            if (currentphotoid != 0) {
                const p = await GetPhoto(currentphotoid)
                console.log("qwerty pp", p, currentphotoid)
                // setPhotos([...photos, p.data])

                setcurrentphoto(p.data)
            }
        }
        fetchP();

    }, [currentphotoid])


    const setNextPhotoId = useCallback(() => {
        const curPIndex = photoDetails.findIndex((p: any) => p.id == currentphotoid)
        console.log("qwerty-setNextPhotoId", curPIndex, currentphotoid)
        if (curPIndex != -1) {
            if (curPIndex < photoDetails.length - 1) {
                setcurrentphotoid(photoDetails[curPIndex + 1].id)
            }
        }
    }, [currentphotoid])

    const setBackPhotoId = useCallback(() => {
        const curPIndex = photoDetails.findIndex((p: any) => p.id == currentphotoid)
        if (curPIndex != -1) {
            if (curPIndex != 0) {
                setcurrentphotoid(photoDetails[curPIndex - 1].id)
            }
        }
    }, [currentphotoid])



    return (
        <Card  >
            <CardHeader>
                <CardTitle>{currentphoto?.title}</CardTitle>
                <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative w-[300px] h-[300px]">  
                    {photoDetails.length > 0 ? <Image src={currentphoto?.src} fill alt="p" className="object-contain" /> : <span>NO Photos</span>}
                </div>  
            </CardContent>
            <CardFooter>
                <Button onClick={setBackPhotoId} className="mr-4">Back</Button><Button onClick={setNextPhotoId}>Next</Button>
            </CardFooter>
        </Card>
    )

}