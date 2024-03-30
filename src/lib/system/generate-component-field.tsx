
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

export const GenerateComponentField = ({ field, control, inputClassName = "", loaderFunc }: { loaderFunc: () => {}, field: any, control: any, inputClassName?: string }): any => {
    const label = field.label;
    const placeholder = field.placeholder;
    const inputType = field.inputType;
    const disabled = field.disabled ? { disabled: true } : { disabled: false };
    return (
        <FormField
            control={control}
            name={field.columnName}
            render={({ field }) => (
                <FormItem className="w-full" >
                    <FormLabel>{label} </FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder}  {...field} {...disabled} type={inputType} className={inputClassName} />
                    </FormControl>

                    <FormMessage />
                </FormItem>
            )}
        />
    )
}