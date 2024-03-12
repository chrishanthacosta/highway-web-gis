
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

export const GenerateShadcnArrayFormField = ({ field, control, name, index }: { field:any,control:any,name:string,index:Number}):any => {
  const label = field.label;
  const placeholder = field.placeholder;
  const inputType = field.inputType;
  console.log("generated ff",label)
    return (
          <FormField
                control={control}
        name={`${name}.${index}.${field.columnName}` }
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