

export const GenerateDefaults = (configurationSchema: any): any => {
     const keys:string[] = Object.keys(configurationSchema.fields)
    const result:any = {}
    keys.forEach((key: string) => {
        const prop: any = configurationSchema.fields[key]
        if (prop.default != undefined) {
            result[key] = prop.default ;
        }
        
       
    });
    console.log("result-defaults",result)
    return result

}