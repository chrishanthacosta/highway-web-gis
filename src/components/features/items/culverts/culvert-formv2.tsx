"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { boolean, z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { GenerateZodFormSchema } from '@/lib/system/generate-zod-form-schema';
import { CulvertFormUiSchema, CulvertSchema } from '@/components/features/items/culverts/culvert-schema';
import { GenerateDefaults } from '@/lib/system/generate-zod-defaults';
import { GenerateShadcnFormInputField } from '@/lib/system/generate-shadcn-form-input-field';
import { GenerateShadcnArrayFormField } from '@/lib/system/generate-shadcn-array-form-field';
import { GenerateShadcnArrayTableHeader } from '../../../../lib/system/generate-shadcn-array-header';
import CameraComponent from '../../../../lib/camera/camera-component';
import { insertCulvert, updateCulvert } from '@/components/features/items/culverts/actions-culvert';
import { AddSampleData } from '../../../../lib/system/add-sample-data';
import { DivComponent } from '../../../../lib/system/code-gen-helpers/get-div-component';
import { GenerateUiFromSchema } from '@/lib/system/generate-ui-from-schema';
import { GetInsertSqliteStatement } from '@/lib/system/sqlite-helpers/get-insert-sqlite-stmt';
import { cn } from '@/lib/utils';
import { GetUpdateQuery } from '@/lib/system/sqlite-helpers/get-update-sqlite-stmt';
import PhotoComponent, { Photo } from '../../../../lib/photos/photo-component';

import GeoPositionPicker from '@/lib/geo-location/geo-position.jsx';
import Popup from '@/lib/popups/popup-type1';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { GetPhoto, GetPhotoDetails } from '../photos/actions-photos';

const formDef = GenerateZodFormSchema(CulvertSchema);
export const CulvertFormSchema = z.object(formDef)


const defaultValues: any = GenerateDefaults(CulvertSchema);




export const CulvertFormv2 = ({ id1, data1 }: { id1?: number, data1?: any }) => {
  const router = useRouter()
  const [showPhotos, setshowPhotos] = useState<boolean>(false)
  const [photos, setPhotos] = useState<any>([])
  const [photo, setPhoto] = useState<any>(null)
  //const [showGeoLocation, setshowGeoLocation] = useState<boolean>(false)
  // const [locationCoords, setlocationCoords] = useState<{}>({})
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(CulvertFormSchema),
    defaultValues: {
      ...defaultValues, culvertspans: [{
        spanno: "1",
        supportcenterspan: 0,
        clearspan: 0,
        clearHeight: 0
      }]
    },

  });

  const { watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading }, } = form;
  let spanCount: number;
  spanCount = watch("openingCount");
  let lat = watch("latitude")
  let lon = watch("longitude")
  useEffect(() => {

    if (data1) {
      form.reset(data1)
      // setValue("culvertType", "system");
    }
  }, [data1])

  // useEffect(() => {
  //   console.log("id1-usee", id1)

  // }, [id1])





  const { fields, append, remove } = useFieldArray({ name: CulvertSchema.linkedSchemas[0].tableName, control: form.control })

  async function onSubmit(data: z.infer<typeof CulvertFormSchema>) {
    console.log("  query -    obj-rty",)
    const dirtyValues = Object.fromEntries(
      Object.entries(data).filter(([key]) => dirtyFields[key])
    );

    const uq = GetUpdateQuery(CulvertSchema, id1, dirtyValues)
    console.log("uq-rty", uq, id1, dirtyValues)
    if (id1) { //update query - new obj
      console.log("update query -  old obj-rty",)

      //span table insert

      if (dirtyFields.hasOwnProperty("culvertspans")) {
        const insertSQls = GetInsertSqliteStatement(CulvertSchema, data)
        if (uq) {
          console.log("update query -  old obj-rty1",)
          updateCulvert(id1, uq, data.culvertspans, insertSQls)
        }
        else {
          console.log("update query -  old obj-rty2",)
          updateCulvert(id1, undefined, data.culvertspans, insertSQls)
        }
      } else {
        console.log("update query -  old obj-rty3.0",)
        if (uq) {
          console.log("update query -  old obj-rty3.1",)
          updateCulvert(id1, uq, undefined, undefined)
        }
      }
      toast({
        title: "Updated done:",
        description: "id-" + id1,
      })

    } else { //insert query - new obj
      console.log("insert query - new obj-rty",)
      const insertSQls = GetInsertSqliteStatement(CulvertSchema, data)
      const objId = await insertCulvert(insertSQls);
      id1 = objId.lastInsertRowid;
      toast({
        title: "Saving done:",
        description: "id-" + id1,
      })
      router.push("/culverts/list/" + id1)
    }



  }

  useEffect(() => {
    if (spanCount) {
      const emptySpans: any = []
      for (let index = 0; index < spanCount; index++) {
        const element = { spanno: index + 1, supportcenterspan: 0, clearspan: 0, clearHeight: 0 }
        emptySpans.push(element)
      }
      setValue("culvertspans", emptySpans);


    }
  }, [spanCount])

  // const locationHandler = (loc) => {
  //   setlocationCoords(loc)
  //   alert("rec loc")
  // }

  // const setLat = useCallback((lat: number) => {
  //   setValue("latitude", lat, { shouldDirty: true })
  // }, [])
  // const setLon = useCallback((lon: number) => {
  //   setValue("longitude", lon, { shouldDirty: true })
  // }, [])

  const GeolocationButton = useCallback(() => {
    console.log("getValues(latitude)", getValues("latitude"),)

    let c: number[]

    const setc = (c1: number[]) => {
      c = c1
    }

    const passCoords = () => {
      setValue("latitude", c[1], { shouldDirty: true })
      setValue("longitude", c[0], { shouldDirty: true })
    }





    return (
      <Popup trigger="Set on Map" onClose={() => passCoords()} >

        <GeoPositionPicker setc={setc} lat={lat} lon={lon}></GeoPositionPicker>
      </Popup>
    )
  }, [lat, lon])

  const loadPhotos = useCallback(async () => {

    if (id1 == 0 || id1 == null) {
      toast({
        title: "Save before loading images",
        description: ""

      })
      return
    }
    //check if already loaded

    if (photos.length > 0) {
      return
    }

    const photoDetails = await GetPhotoDetails(id1)

    for (const pd of photoDetails.data) {
      const p = await GetPhoto(pd.id)
      setPhoto(p.data)
    }


    //
  }, [id1])

  useEffect(() => {
    if (photo) {
      setPhotos([...photos, photo])
    }
  }, [photo])

  return (
    <div className='flex flex-col items-center justify-center mx-auto w-full  '>
      {/* <div className='mr-auto w-full'>
        <div className='flex justify-center '>
          
          <Popup trigger="Set on Map" onClose={() => console.log('Popup closed')} >

            <GeoPositionPicker ></GeoPositionPicker>
          </Popup>
        </div>
      </div> */}


      <div className="flex gap-2 w-full justify-end">
        <Button variant="default" onClick={form.handleSubmit(onSubmit)} disabled={!isDirty}>save Data</Button>
        <Button ><Link href="/culverts/add">Add New Culvert</Link></Button>
        <Button type="button" onClick={() => {
          //setValue("culvertspans.0.clearspan",3)
          AddSampleData(CulvertSchema, setValue)
        }}>Add Sample Data</Button>

      </div>


      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'  >
          <FormDescription>

          </FormDescription>
          <div className="flex flex-col justify-center flex-wrap gap-2 w-full">
            {GenerateUiFromSchema(CulvertFormUiSchema, CulvertSchema, form.control, fields, { setlocation: GeolocationButton })}
            

          </div>


          <div className="flex items-center min-w-3/4 border-2 border-gray-200 rounded-sm pl-[15vw] my-2">
            <Button type="submit" disabled={!isDirty} className="m-4">Submit</Button>
          </div>

          {/* <Button type="button" onClick={() => {
            //setValue("culvertspans.0.clearspan",3)
            AddSampleData(CulvertSchema, setValue)
          }}>Add Sample Data</Button> */}
        </form>
      </Form>
      <div className="flex items-center w-full border-2 border-gray-200 rounded-sm pl-[15vw] my-2">
        <Button type="button" onClick={async () => {
          await loadPhotos()
          setshowPhotos(!showPhotos)
        }} className="m-4" >
          {showPhotos ? "Hide Photos" : (id1 ? "Show Photos" : "Save to Add Photos")}
        </Button>
      </div>
      <div className="flex items-center w-full border-2 border-gray-200 rounded-sm pl-[15vw] mt-2 mb-[5rem]">
        {showPhotos && <PhotoComponent linkid={id1} photos={photos} setPhotos={setPhotos as any} ></PhotoComponent>}
      </div>
      {/* {showGeoLocation && <PhotoComponent></PhotoComponent>} */}


    </div>
  )
}