"use client"
import React, { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { z } from "zod";
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
import { BridgeSchema } from '@/components/features/items/bridges/bridge-schema';
import { GenerateDefaults } from '@/lib/system/generate-zod-defaults';
import { GenerateShadcnFormField } from '@/lib/system/generate-shadcn-form-field';
import { GenerateShadcnArrayFormField } from '@/lib/system/generate-shadcn-array-form-field';
import { GenerateShadcnArrayTableHeader } from '../../../../lib/system/generate-shadcn-array-header';
import CameraComponent from '../../../../lib/camera/camera-component';
import { saveBridge } from '@/components/features/items/bridges/actions-bridge';
import { AddSampleData } from '../../../../lib/system/add-sample-data';
import { DivComponent } from '../../../../lib/system/code-gen-helpers/get-div-component';

const formDef = GenerateZodFormSchema(BridgeSchema);
export const BridgeFormSchema = z.object(formDef)

// const BridgeFormSchema = z.object({
//   location: z.string().refine((val) => val.length > 0, {
//     message: "required",
//   }),
//   roadName: z.string().refine((val) => val.length > 0, {
//     message: "required",
//   }) ,
//   eeDivision: z.string().refine((val) => val.length > 0, {
//     message: "required",
//   }) ,
//   bridgeName: z.string().refine((val) => val.length > 0, {
//     message: "required",
//   }) ,
//   riverName: z.string().refine((val) => val.length > 0, {
//     message: "required",
//   }) ,
//   village: z.string().refine((val) => val.length > 0, {
//     message: "required",
//   }) ,
//   constructedYear: z.coerce.number().optional() ,
//   spans: z.array(
//     z.object({
//       supportceneterspan: z.number(),
//       clearspan: z.number(),
//     })
//   ),
//   bridgeWith: z.number(),
//   overallBridgeWidth: z.number(),
//   carriagewayWidth: z.number(),
//   footwalkWidthLeft: z.number(),
//   footwalkWidthRight: z.number(),
//   bridgeLength: z.number(),
//   crossingDetails: z.string(),
//   riverWidth: z.number(),
//   riverDepth: z.number(),
//   paintingAreaSteel: z.number(),
//   paintingAreaConcrete: z.number(),

// })

//   .refine(
//   (data) => {
//     if (!data.location) {
//       console.log("pio", data.location)
//       return !!data.location;
//     }
//     return true;
//   },
//   {
//     message: "location is required",
//     path: ["location"],
//   }
// );
const defaultValues: any = GenerateDefaults(BridgeSchema);



export const BridgeForm = () => {
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

  const { watch, setValue } = form;

  const spanCount = watch("spanCount");

  const { fields, append, remove } = useFieldArray({ name: BridgeSchema.linkedSchemas[0].tableName, control: form.control })

  function onSubmit(data: z.infer<typeof BridgeFormSchema>) {
    //console.log("data-data",data,)
    saveBridge(data)
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
        const element = { spanno: index + 1 }
        emptySpans.push(element)
      }


      setValue("bridgespans", emptySpans);


    }
  }, [spanCount])



  return (
    <div className='flex items-center justify-center mx-auto w-full border-4 '>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'  >
          <FormDescription>
            Bridge Data
          </FormDescription>
          <div className="flex justify-center flex-wrap gap-2 w-full">
            <div className="flex justify-center flex-wrap gap-2 w-full">
              <div className="flex flex-col gap-2 w-full md:w-1/3 min-w-80">

                {GenerateShadcnFormField({ field: BridgeSchema.fields.location, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.roadName, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.bridgeWidth, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.bridgeOverallWidth, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.footWalkLhsWidth, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.footWalkRhsWidth, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.riverWidth, control: form.control })}

              </div>
              <div className=" flex flex-col gap-2 w-full md:w-1/3 min-w-80">
                {GenerateShadcnFormField({ field: BridgeSchema.fields.eeDivision, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.constructedYear, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.carriagewayWidth, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.crossingDetails, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.riverDepth, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.paintingAreaSteel, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.paintingAreaConcrete, control: form.control })}

              </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-wrap gap-2 w-full">
              <h1>Spans</h1>
              {GenerateShadcnFormField({ field: BridgeSchema.fields.spanCount, control: form.control, inputClassName: "max-w-80" })}
              {/* <div className="min-w-60">
                <Button type='button' onClick={() => append({})}>+</Button>
              </div> */}
              <div className="hidden md:flex items-end flex-wrap ">
                {GenerateShadcnArrayTableHeader(BridgeSchema.linkedSchemas[0])}
              </div>
              {fields.map((field, index) => {
                return (
                  <div key={field.id} className="flex items-end flex-wrap">
                    {/* <div className="min-w-10">
                      <Button type='button' onClick={() => remove(index)}>-</Button>
                    </div> */}
                    <div className="w-20">
                      {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.spanno, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                    </div>
                    <div className="min-w-60">
                      {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.supportcenterspan, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                    </div>
                    <div className="min-w-60">
                      {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.clearspan, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                    </div>
                    {/* <div className="min-w-60">
                      <Button type='button' onClick={() => append({})}>+</Button>
                    </div> */}
                  </div>
                )
              })
              }

            </div>

          </div>

          <CameraComponent />

          <Button type="submit">Submit</Button>
          <Button type="button" onClick={() => {
            //setValue("bridgespans.0.clearspan",3)
            AddSampleData(BridgeSchema, setValue)
          }}>Add Sample Data</Button>
        </form>
      </Form>
      <DivComponent className="bg-red-600"> <p>samples</p> </DivComponent>
    </div>
  )
}