"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
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
import { GenerateShadcnFormField } from '../../../../lib/system/generate-shadcn-form-field';

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
    defaultValues,
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
            <div className="flex flex-col gap-2 w-full md:w-1/3 min-w-80"> 
              {/* <FormField
                
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="location" {...field}   />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              {GenerateShadcnFormField({ name: "location",   control: form.control,  schema: BridgeSchema})}
              {GenerateShadcnFormField({ name: "roadName",   control: form.control,  schema: BridgeSchema})}
              {GenerateShadcnFormField({ name: "eeDivision",   control: form.control,  schema: BridgeSchema})}
              {GenerateShadcnFormField({ name: "constructedYear",   control: form.control,  schema: BridgeSchema})}
             
              {/* <FormField
                control={form.control}
                name="roadName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Road Name</FormLabel>
                    <FormControl>
                      <Input placeholder="roadName" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="eeDivision"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>EE Division</FormLabel>
                    <FormControl>
                      <Input placeholder="eeDivision" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
           </div>
           <div  className=" flex flex-col gap-2 w-full md:w-1/3 min-w-80">
              <FormField
                control={form.control}
                name="bridgeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bridge Name</FormLabel>
                    <FormControl>
                      <Input placeholder="bridgeName" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="riverName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>River Name</FormLabel>
                    <FormControl>
                      <Input placeholder="riverName" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="village"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village</FormLabel>
                    <FormControl>
                      <Input placeholder="village" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}