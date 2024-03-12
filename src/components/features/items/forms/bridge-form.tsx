"use client"
import React from 'react'
import { useForm,useFieldArray } from 'react-hook-form'
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
import { BridgeSchema } from '@/schemas/bridge-schema';
import { GenerateDefaults } from '@/lib/system/generate-zod-defaults';
import { GenerateShadcnFormField } from '@/lib/system/generate-shadcn-form-field';
import { GenerateShadcnArrayFormField } from '@/lib/system/generate-shadcn-array-form-field';

const formDef = GenerateZodFormSchema(BridgeSchema);
const formSchema = z.object(formDef)

// const formSchema = z.object({
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
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues ,bridgespans:[{
      spanno: "1",
      supportcenterspan: 0,
      clearspan: 0,
    }]},
    // defaultValues:
    // {
    //   location: "",
    //   roadName: "",
    //   eeDivision: "",
    //   bridgeName: "",
    //   riverName: "",
    //   village: "",
    //   // constructedYear: null,
    //   spans: [],
    //   bridgeWith: 0,
    //   overallBridgeWidth: 0,
    //   carriagewayWidth: 0,
    //   footwalkWidthLeft: 0,
    //   footwalkWidthRight: 0,
    //   bridgeLength: 0,
    //   crossingDetails: "",
    //   riverWidth: 0,
    //   riverDepth: 0,
    //   paintingAreaSteel: 0,
    //   paintingAreaConcrete: 0,
    // },
  });

  const { fields,append,remove } = useFieldArray({ name: BridgeSchema.linkedSchemas[0].tableName, control:form.control })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("data-data",data,)
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }


  return (
    <div className='flex items-center justify-center mx-auto w-full '>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'  >
            <FormDescription>
                  Bridge Data
            </FormDescription>
          <div className="flex justify-center flex-wrap gap-2 w-full"> 
            <div className="flex justify-center flex-wrap gap-2 w-full">
              <div className="flex flex-col gap-2 w-full md:w-1/3 min-w-80"> 
              
                {GenerateShadcnFormField({ field: BridgeSchema.fields.location,   control: form.control})}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.roadName,   control: form.control})}
            
                </div>
              <div className=" flex flex-col gap-2 w-full md:w-1/3 min-w-80">
                {GenerateShadcnFormField({ field: BridgeSchema.fields.eeDivision, control: form.control })}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.constructedYear, control: form.control })}
                
              </div>
            </div>
            <div>
              <h1>Spans</h1>
              <div >
                {fields.map((field, index) => { return(
                  <div key={field.id} className="flex items-end">
                    <Button onClick={() => remove(index)}>-</Button>
                    {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.spanno, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                    {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.supportcenterspan, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                    {GenerateShadcnArrayFormField({ field: BridgeSchema.linkedSchemas[0].fields.clearspan, control: form.control, name: BridgeSchema.linkedSchemas[0].tableName, index })}
                    <Button onClick={()=> append({})}>+</Button>
                  </div>
                )})
                }
              </div>
              </div> 

          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}