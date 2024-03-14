
import { DivComponent } from './code-gen-helpers/get-div-component';
import { GenerateShadcnFormField } from './generate-shadcn-form-field';
import { GenerateUiFromLinkedSchema } from './generate-ui-from-linkedSchema';

export const GenerateUiFromSchema = (uiSchema:any,configurationSchema:any,control:any, linkedFields:any ):any => {
    const panelDivs= []
    for (const panel of uiSchema.panels) {
        const panelClassName = panel.className;
        const columnContainerClassName = panel.columnContainerClassName;

       
        const columnDivs=[]

        for (const column of panel.columns) {
            const rowDivs=[]
            const columnClassName = column.className;
            for (const row of column.rows) {
                const rowClassName = row.className;
                if (configurationSchema.fields[row.name]) {
                    rowDivs.push(<DivComponent className={rowClassName} >
                        {GenerateShadcnFormField({ field: configurationSchema.fields[row.name], control: control })}
                    </DivComponent>)
                } else { //linked schema
                    rowDivs.push(<DivComponent className={rowClassName} >
                        {GenerateUiFromLinkedSchema(linkedFields, configurationSchema, control,0)}
                    </DivComponent>)
                    
                }
            }
            columnDivs.push(<DivComponent className={columnClassName} >{...rowDivs} </DivComponent>)
        }
         
        panelDivs.push(<DivComponent className={panelClassName} >
            <div className={columnContainerClassName}>
                {...columnDivs}
            </div>
        </DivComponent>)
    }

 return panelDivs;
}