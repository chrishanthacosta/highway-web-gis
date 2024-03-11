
import React from 'react';

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

export const GenerateShadcnFormField = ({ schema, name, control}: {schema:any,name:string,control:any}):any => {
  const label = schema.fields[name].label;
  const placeholder = schema.fields[name].placeholder;
  const inputType = schema.fields[name].inputType;
  console.log("generated ff",label)
    return (
          <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className= "w-full" >
                    <FormLabel>{ label } </FormLabel>
                    <FormControl>
                      <Input placeholder={placeholder} {...field} type={inputType}  />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
    )
}