

export const GenerateShadcnArrayTableHeader = (configurationSchema:any) => {
    
 const keys:string[] = Object.keys(configurationSchema.fields)
    const result: any = {}
    const headerDivs:any =[]
    keys.forEach((key: string) => {
        const prop: any = configurationSchema.fields[key]
        if (prop.form ) {
            headerDivs.push(<div className={prop.headerClassName} key={prop.columnName}>{prop.label}</div>)
        }
        
       
    });
    return (<div className="flex ">{...headerDivs }</div>)

}