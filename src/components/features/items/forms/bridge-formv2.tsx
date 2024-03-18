"use client"
import React, { useEffect } from 'react'
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
import { BridgeFormUiSchema, BridgeSchema } from '@/schemas/bridge-schema';
import { GenerateDefaults } from '@/lib/system/generate-zod-defaults';
import { GenerateShadcnFormField } from '@/lib/system/generate-shadcn-form-field';
import { GenerateShadcnArrayFormField } from '@/lib/system/generate-shadcn-array-form-field';
import { GenerateShadcnArrayTableHeader } from '../../../../lib/system/generate-shadcn-array-header';
import CameraComponent from '../../../camera/camera-component';
import { insertBridge,   updateBridge  } from '@/actions/bridges/actions-bridge';
import { AddSampleData } from '../../../../lib/system/add-sample-data';
import { DivComponent } from '../../../../lib/system/code-gen-helpers/get-div-component';
import { GenerateUiFromSchema } from '@/lib/system/generate-ui-from-schema';
import { GetInsertSqliteStatement } from '@/lib/system/sqlite-helpers/get-insert-sqlite-stmt';
import { cn } from '@/lib/utils';
import { GetUpdateQuery } from '@/lib/system/sqlite-helpers/get-update-sqlite-stmt';

const formDef = GenerateZodFormSchema(BridgeSchema);
export const BridgeFormSchema = z.object(formDef)

 
const defaultValues: any = GenerateDefaults(BridgeSchema);

export const LoadingSpinner = ({ className }:{className?:string}) => { return(
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


export const BridgeFormv2 = ({id1,data1}:{id1?:number,data1?:any}) => {
  const { toast } = useToast()
  const form = useForm({
    resolver: zodResolver(BridgeFormSchema),
    defaultValues: { ...defaultValues ,bridgespans:[{
      spanno: "1",
      supportcenterspan: 0,
      clearspan: 0,
    }]},
     
  });

  const { watch, setValue, formState: { isDirty, dirtyFields,isLoading }, } = form;
  let spanCount: number;
  spanCount = watch("spanCount");
  useEffect(() => {
    console.log("ppo11",id1,data1)
    if (data1) {
      form.reset(data1)
     }
  }, [data1])

  useEffect(() => {
      console.log("id1-usee",id1)
   
  }, [id1])

 

 

  const { fields,append,remove } = useFieldArray({ name: BridgeSchema.linkedSchemas[0].tableName, control:form.control })

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
      
      if (dirtyFields.hasOwnProperty("bridgespans")){
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
     
        
                
    }else{ //insert query - new obj
      console.log("insert query - new obj-rty",)
      const insertSQls = GetInsertSqliteStatement(BridgeSchema, data)
      const objId = await insertBridge(insertSQls);
    }

    toast({
      title: "You submitted the following values:",
      description:  "Added",
    })
   
    
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

  useEffect(()=>{
    if (spanCount) {
      const emptySpans:any = []
      for (let index = 0; index < spanCount; index++) {
        const element = { spanno: index + 1, supportcenterspan: 0, clearspan :0}
        emptySpans.push(element)
      }
      setValue("bridgespans", emptySpans);
     
       
    }
  },[spanCount])
  
  

  return (
    <div className='flex items-center justify-center mx-auto w-full border-4 border-indigo-600'>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'  >
            <FormDescription>
                  Bridge Data
            </FormDescription>
          <div className="flex flex-col justify-center flex-wrap gap-2 w-full"> 
            {GenerateUiFromSchema(BridgeFormUiSchema, BridgeSchema, form.control, fields)}
            {/* <div className="flex justify-center flex-wrap gap-2 w-full">
              <div className="flex flex-col gap-2 w-full md:w-1/3 min-w-80"> 
              
                {GenerateShadcnFormField({ field: BridgeSchema.fields.location,   control: form.control})}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.roadName,   control: form.control})}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.bridgeWidth,   control: form.control})}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.bridgeOverallWidth,   control: form.control})}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.footWalkLhsWidth,   control: form.control})}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.footWalkRhsWidth,   control: form.control})}
                {GenerateShadcnFormField({ field: BridgeSchema.fields.riverWidth,   control: form.control})}
                
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
              {GenerateShadcnFormField({ field: BridgeSchema.fields.spanCount, control: form.control,inputClassName:"max-w-80" })}
           
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

          <CameraComponent/>

          <Button type="submit" disabled={!isDirty}>Submit</Button>
          <Button type="button" onClick={() => { 
            //setValue("bridgespans.0.clearspan",3)
            AddSampleData(BridgeSchema, setValue)
          }}>Add Sample Data</Button>
        </form>
      </Form>
      {!isLoading || <LoadingSpinner />}
    </div>
  )
}