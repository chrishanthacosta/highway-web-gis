
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller } from 'react-hook-form';


export const GenerateShadcnFormSelectField = ({ field, control, inputClassName="" }: { field: any, control: any, inputClassName?:string }):any => {
  const label = field.label;
   const placeholder = field.placeholder;
   
  const disabled = field.disabled ? { disabled:true} : { disabled:false};
  return (
       
    <FormField
                control={control}
                name={field.columnName}
                render={({ field }) => (
                    <FormItem className= "w-full" >
                    <FormLabel>{ label } </FormLabel>
                  
                      {/* <Input placeholder={placeholder}  {...field} {...disabled} type={inputType} className={inputClassName} /> */}
                      <Select onValueChange={field.onChange} defaultValue={field.value}  >
                         <FormControl> 
                        <SelectTrigger className={inputClassName}>
                          <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent ref={field.ref} >
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                  

                    <FormMessage />
                  </FormItem>
                )}
    />
 
    )
}