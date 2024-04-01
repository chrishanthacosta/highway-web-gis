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
import { TableGenSchema } from '@/components/features/tablegen/tablegen-schema';
import { GenerateDefaults } from '@/lib/system/generate-zod-defaults';
import { GenerateShadcnFormInputField } from '@/lib/system/generate-shadcn-form-input-field';

const formDef = GenerateZodFormSchema(TableGenSchema);
const formSchema = z.object(formDef)
const defaultValues: any = GenerateDefaults(TableGenSchema);
export default function Page() {
    const { toast } = useToast()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues,

    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log("data-data", data,)
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
                        Table Gen Data
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
                            {GenerateShadcnFormInputField({ field: TableGenSchema.fields.tablename, control: form.control })}

                        </div>

                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

