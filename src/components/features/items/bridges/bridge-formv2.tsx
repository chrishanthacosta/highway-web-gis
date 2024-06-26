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
import { BridgeFormUiSchema, BridgeSchema } from '@/components/features/items/bridges/bridge-schema';
import { GenerateDefaults } from '@/lib/system/generate-zod-defaults';
import { GenerateShadcnFormInputField } from '@/lib/system/generate-shadcn-form-input-field';
import { GenerateShadcnArrayFormField } from '@/lib/system/generate-shadcn-array-form-field';
import { GenerateShadcnArrayTableHeader } from '../../../../lib/system/generate-shadcn-array-header';
import CameraComponent from '../../../../lib/camera/camera-component';
import { insertBridge, updateBridge } from '@/components/features/items/bridges/actions-bridge';
import { AddSampleData } from '../../../../lib/system/add-sample-data';
import { DivComponent } from '../../../../lib/system/code-gen-helpers/get-div-component';
import { GenerateUiFromSchema } from '@/lib/system/generate-ui-from-schema';
import { GetInsertSqliteStatement } from '@/lib/system/sqlite-helpers/get-insert-sqlite-stmt';
import { cn } from '@/lib/utils';
import { GetUpdateQuery } from '@/lib/system/sqlite-helpers/get-update-sqlite-stmt';
import PhotoComponent, { Photo } from './../../../../lib/photos/photo-component';

import GeoPositionPicker from '@/lib/geo-location/geo-position';
import Popup from '@/lib/popups/popup-type1';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { GetPhoto, GetPhotoDetails } from '../photos/actions-photos';

const formDef = GenerateZodFormSchema(BridgeSchema);
export const BridgeFormSchema = z.object(formDef)


const defaultValues: any = GenerateDefaults(BridgeSchema);

export const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>)
}


export const BridgeFormv2 = ({ id1, data1 }: { id1?: number, data1?: any }) => {
  const router = useRouter()
  const [showPhotos, setshowPhotos] = useState<boolean>(false)
  const [photos, setPhotos] = useState<any>([])
  const [photo, setPhoto] = useState<any>(null)
  //const [showGeoLocation, setshowGeoLocation] = useState<boolean>(false)
  // const [locationCoords, setlocationCoords] = useState<{}>({})
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(BridgeFormSchema),
    defaultValues: {
      ...defaultValues, bridgespans: [{
        spanno: "1",
        supportcenterspan: 0,
        clearspan: 0,
      }]
    },

  });

  const { watch, setValue, getValues, formState: { isDirty, dirtyFields, isLoading }, } = form;
  let spanCount: number;
  spanCount = watch("spanCount");
  let lat = watch("latitude")
  let lon = watch("longitude")
  useEffect(() => {
    console.log("ppo11", id1, data1)
    if (data1) {
      form.reset(data1)
    }
  }, [data1])

  // useEffect(() => {
  //   console.log("id1-usee", id1)

  // }, [id1])





  const { fields, append, remove } = useFieldArray({ name: BridgeSchema.linkedSchemas[0].tableName, control: form.control })

  async function onSubmit(data: z.infer<typeof BridgeFormSchema>) {
    console.log("  query -    obj-rty",)
    const dirtyValues = Object.fromEntries(
      Object.entries(data).filter(([key]) => dirtyFields[key])
    );

    const uq = GetUpdateQuery(BridgeSchema, id1, dirtyValues)
    console.log("uq-rty", uq, id1, dirtyValues)
    if (id1) { //update query - new obj
      console.log("update query -  old obj-rty",)

      //span table insert

      if (dirtyFields.hasOwnProperty("bridgespans")) {
        const insertSQls = GetInsertSqliteStatement(BridgeSchema, data)
        if (uq) {
          console.log("update query -  old obj-rty1",)
          updateBridge(id1, uq, data.bridgespans, insertSQls)
        }
        else {
          console.log("update query -  old obj-rty2",)
          updateBridge(id1, undefined, data.bridgespans, insertSQls)
        }
      } else {
        console.log("update query -  old obj-rty3.0",)
        if (uq) {
          console.log("update query -  old obj-rty3.1",)
          updateBridge(id1, uq, undefined, undefined)
        }
      }
      toast({
        title: "Updated done:",
        description: "id-" + id1,
      })

    } else { //insert query - new obj
      console.log("insert query - new obj-rty",)
      const insertSQls = GetInsertSqliteStatement(BridgeSchema, data)
      const objId = await insertBridge(insertSQls);
      id1 = objId.lastInsertRowid;
      toast({
        title: "Saving done:",
        description: "id-" + id1,
      })
      router.push("/bridges/list/" + id1)
    }


    // toast({
    //   title: "Saving:",
    //   description: "Added",
    // })


    return





    //
    //await saveBridge(q,data)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}
          </code>
        </pre>
      ),
    })


  }

  useEffect(() => {
    if (spanCount) {
      const emptySpans: any = []
      for (let index = 0; index < spanCount; index++) {
        const element = { spanno: index + 1, supportcenterspan: 0, clearspan: 0 }
        emptySpans.push(element)
      }
      setValue("bridgespans", emptySpans);


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
    console.log("qwerty", photoDetails)
    for (const pd of photoDetails.data) {
      const p = await GetPhoto(pd.id)
      console.log("qwerty", p)
      // setPhotos([...photos, p.data])

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
    <div className='flex flex-col items-center justify-center mx-auto w-full px-2 md:px-0 '>
      {/* <div className='mr-auto w-full'>
        <div className='flex justify-center '>
          
          <Popup trigger="Set on Map" onClose={() => console.log('Popup closed')} >

            <GeoPositionPicker ></GeoPositionPicker>
          </Popup>
        </div>
      </div> */}


      <div className="flex gap-2 w-full justify-end">
        <Button variant="default" onClick={form.handleSubmit(onSubmit)} disabled={!isDirty}>save Data</Button>
        <Button ><Link href="/bridges/add">Add New Bridge</Link></Button>
        <Button type="button" onClick={() => {
          //setValue("bridgespans.0.clearspan",3)
          AddSampleData(BridgeSchema, setValue)
        }}>ASD</Button>

      </div>


      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'  >
          <FormDescription>

          </FormDescription>
          <div className="flex flex-col justify-center flex-wrap gap-2 w-full">
            {GenerateUiFromSchema(BridgeFormUiSchema, BridgeSchema, form.control, fields, { setlocation: GeolocationButton })}
            {/* <div className="flex justify-center flex-wrap gap-2 w-full">
              <div className="flex flex-col gap-2 w-full md:w-1/3 min-w-80"> 
                
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.location,   control: form.control})}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.roadName,   control: form.control})}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.bridgeWidth,   control: form.control})}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.bridgeOverallWidth,   control: form.control})}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.footWalkLhsWidth,   control: form.control})}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.footWalkRhsWidth,   control: form.control})}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.riverWidth,   control: form.control})}
                
                </div>
              <div className=" flex flex-col gap-2 w-full md:w-1/3 min-w-80">
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.eeDivision, control: form.control })}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.constructedYear, control: form.control })}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.carriagewayWidth, control: form.control })}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.crossingDetails, control: form.control })}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.riverDepth, control: form.control })}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.paintingAreaSteel, control: form.control })}
                {GenerateShadcnFormInputField({ field: BridgeSchema.fields.paintingAreaConcrete, control: form.control })}
                
              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-wrap gap-2 w-full">
              <h1>Spans</h1>
              {GenerateShadcnFormInputField({ field: BridgeSchema.fields.spanCount, control: form.control,inputClassName:"max-w-80" })}
           
                <div className="hidden md:flex items-end flex-wrap ">
                {GenerateShadcnArrayTableHeader(BridgeSchema.linkedSchemas[0])}
                </div>
                {fields.map((field, index) => { return(
                  <div key={field.id} className="flex items-end flex-wrap">
                 
                    <div className="w-20">
                      {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.spanno, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                      </div>
                    <div className="min-w-60">
                    {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.supportcenterspan, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                    </div>
                    <div className="min-w-60">
                      {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.clearspan, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                    </div>
                  
                  </div>
                )})
                }
             
              </div>  */}

          </div>


          <div className="flex items-center min-w-3/4 border-2 border-gray-200 rounded-sm pl-[15vw] my-2">
            <Button type="submit" disabled={!isDirty} className="m-4">Submit</Button>
          </div>

          {/* <Button type="button" onClick={() => {
            //setValue("bridgespans.0.clearspan",3)
            AddSampleData(BridgeSchema, setValue)
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

      {/* {!isLoading || <LoadingSpinner />} */}
    </div>
  )
}