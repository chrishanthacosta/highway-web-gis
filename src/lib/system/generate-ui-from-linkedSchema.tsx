import { GenerateShadcnArrayFormField } from "./generate-shadcn-array-form-field"
import { GenerateShadcnArrayTableHeader } from "./generate-shadcn-array-header"


export const GenerateUiFromLinkedSchema = (fields: any, configurationSchema: any, control: any,schemaIndex:number): any => {


    return (
        <>
        <div className="hidden md:flex items-end flex-wrap ">
                {GenerateShadcnArrayTableHeader(configurationSchema.linkedSchemas[schemaIndex])}
        </div>
            <div className="flex items-end flex-wrap">
        {
                    fields.map((field: any, index: number) => {
                
                return (
                    <div key={field.id} className="flex items-end flex-wrap ">
                        {Object.keys(configurationSchema.linkedSchemas[schemaIndex].fields).map((a,index2) => {
                            
                            const detailField = configurationSchema.linkedSchemas[schemaIndex].fields[a];
                            
                            if (detailField.form) {
                                return (
                                    <div key="index2" className={detailField.divClassName} >
                                   { GenerateShadcnArrayFormField({
                                        field: detailField,
                                        control: control,
                                        name: configurationSchema.linkedSchemas[schemaIndex].tableName,
                                        index
                                    })}
                                    </div>
                            
                                )
                            } else {
                                return 
                            }
                        }
                        
                        )}
                    </div>
                );
            })
         }
                </div>
        </>
    )


}

