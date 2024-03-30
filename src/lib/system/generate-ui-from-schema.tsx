
import { DivComponent } from './code-gen-helpers/get-div-component';
import { GenerateShadcnFormField } from './generate-shadcn-form-field';
import { GenerateShadcnFormLabelField } from './generate-shadcn-form-label-field';
import { GenerateUiFromLinkedSchema } from './generate-ui-from-linkedSchema';

export const GenerateUiFromSchema = (uiSchema:any,configurationSchema:any,control:any, linkedFields:any,componentLoaders:any ):any => {
    const panelDivs = []
    let panelid: number= 1
    for (const panel of uiSchema.panels) {
        const panelClassName = panel.className;
        const columnContainerClassName = panel.columnContainerClassName;

       
        const columnDivs=[]
        let coloumnid: number = 1;
        for (const column of panel.columns) {
            const rowDivs=[]
            const columnClassName = column.className;
            let rowid :number=1
            for (const row of column.rows) {
                const rowClassName = row.className;
                if (configurationSchema.fields[row.name]) {
                    if (configurationSchema.fields[row.name].dataType == "COMPONENT") {
                        console.log("w11",)
                        rowDivs.push(<DivComponent key={rowid} className={rowClassName} >
                            {componentLoaders[row.name]( )}
                        </DivComponent>)
                    } else if (configurationSchema.fields[row.name].inputType == "label") {
                        console.log("aaaaaaaaaaa",)
                        rowDivs.push(<DivComponent key={rowid} className={rowClassName} >
                            {GenerateShadcnFormLabelField({ field: configurationSchema.fields[row.name], control: control })}
                        </DivComponent>)
                    }else {
                        rowDivs.push(<DivComponent key={rowid} className={rowClassName} >
                            {GenerateShadcnFormField({ field: configurationSchema.fields[row.name], control: control })}
                        </DivComponent>)
                    }
                  
                } else { //linked schema
                    rowDivs.push(<DivComponent key={rowid}  className={rowClassName} >
                        {GenerateUiFromLinkedSchema(linkedFields, configurationSchema, control,0)}
                    </DivComponent>)
                    
                }
                rowid++
            }
            columnDivs.push(<DivComponent key={coloumnid}  className={columnClassName} >{...rowDivs} </DivComponent>)
            coloumnid++
        }
        
        panelDivs.push(<DivComponent key={panelid} className={panelClassName} >
            <div className={columnContainerClassName}>
                {...columnDivs}
            </div>
        </DivComponent>)
        panelid++
    }

 return panelDivs;
}