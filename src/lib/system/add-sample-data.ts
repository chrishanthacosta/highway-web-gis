

export const AddSampleData = (configurationSchema:any , setValue:any ) => {
    
    const { fields, linkedSchemas } = configurationSchema;
    const randomInteger = Math.floor(Math.random() * 1000); // Generate random integer between 0 and 99

    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            const element = fields[key];
            if (element.sampleData) {
                
                if (element.dataType == "STRING") {
                setValue(key, element.sampleData + randomInteger);
                }else{
                setValue(key, element.sampleData);
                }
               
            }
        }
    }
    // for (const linkedSchema of linkedSchemas) {
    //     for (const key in linkedSchema.fields) {
    //         if (linkedSchema.fields.hasOwnProperty(key)) {
    //             const element = linkedSchema.fields[key];
    //             if (element.form) {
    //                // console.log("adding lsd",linkedSchema.tableName +".0." + key)
    //                 setValue(linkedSchema.tableName + ".0." + key, element.sampleData);
    //                 //setValue("bridgespans.0.clearspan",3)
    //             }
    //         }
    //     }
    // }
    return  


}