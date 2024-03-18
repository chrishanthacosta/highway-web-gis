
import { z } from "zod";
// return a schema for zod form - all props having form:true is returned
export const GenerateZodFormSchema = (configurationSchema:any):any => {
    const keys:string[] = Object.keys(configurationSchema.fields)
    const result:any = {}
    keys.forEach((key: string) => {
        const prop: any = configurationSchema.fields[key]
        
        switch (prop.dataType) {
            case "INTEGER":
                const c1 = getNumberType(prop)
                if(c1) result[prop.columnName]= c1 
                
                break;
             case "REAL":
                const c11 = getNumberType(prop)
                if(c11) result[prop.columnName]= c11 
                
                break;
            case "STRING":
                const c2 = getStringType(prop)
                if(c2) result[prop.columnName]= c2 
                break;
            default:
                console.log("error in generatezodformschema",prop.dataType)
                break;
        }
       
    });
    //add linked schemas -- detail tables

    configurationSchema.linkedSchemas?.forEach((linkedConfigurationSchema : any) => {
       
        const formDef = GenerateZodFormSchema(linkedConfigurationSchema)
         //console.log("added l formDef",formDef)
        result[linkedConfigurationSchema.tableName] = getLinkedSchemaType(formDef)
        
    });

   // console.log("result-zod-scema formDef",result,)
    return result
}

const getStringType = (prop: any): any => {
    if (!prop.form) return;
    // console.log("added strinbg",prop.label)
    let validatorFn = (val:any): boolean => {return true };
    let validatorMessage:{message:string} = {message:""}
    if (prop.required) {
        validatorFn = (val:any) => val.length > 0;
        validatorMessage ={ message: "required", }
        return z.coerce.string().refine(validatorFn,validatorMessage)
    } else {
         return z.coerce.string()
    }
    
}

const getNumberType = (prop: any): any => {
    if (!prop.form) return;
    // console.log("added number",prop.label)
    let validatorFn = (val:any): boolean => {return true };
    let validatorMessage:{message:string} = {message:""}
    if (prop.required) {
        validatorFn = (val: any) => {
            // console.log("val",val)
            return !isNaN(val)
        };
        validatorMessage ={ message: "required", }
        return z.coerce.number().optional().refine(validatorFn,validatorMessage)
    } else {
        return z.coerce.number().optional();
    }
    
}

const getLinkedSchemaType = (linkedFormDef: any): any => {
    return z.array(
        z.object(linkedFormDef)
    )
}

 // spans: z.array(
//     z.object({
//       supportceneterspan: z.number(),
//       clearspan: z.number(),
//     })
//   ),