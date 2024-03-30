
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
import { Label } from '@/components/ui/label';

export const GenerateShadcnFormLabelField = ({ field, control, inputClassName="" }: { field: any, control: any, inputClassName?:string }):any => {
  const label = field.label;
  const placeholder = field.placeholder;
 
  const disabled = { disabled: true };// field.disabled ? { disabled:true} : { disabled:false};
    return (
          <FormField
                control={control}
                name={field.columnName}
                render={({ field }) => (
                    <FormItem className= "w-full" >
                    <FormLabel>{ label } </FormLabel>
                    <FormControl>
                     
                      <Input placeholder={placeholder}  {...field} {...disabled}  type='text' className={inputClassName}   />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
    )
}