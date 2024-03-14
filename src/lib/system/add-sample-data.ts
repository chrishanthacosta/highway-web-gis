

export const AddSampleData = (configurationSchema:any , setValue:any ) => {
    
    const { fields, linkedSchemas } = configurationSchema;
    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            const element = fields[key];
            if (element.sampleData) {
                setValue(key, element.sampleData);
            }
        }
    }
    for (const linkedSchema of linkedSchemas) {
        for (const key in linkedSchema.fields) {
            if (linkedSchema.fields.hasOwnProperty(key)) {
                const element = linkedSchema.fields[key];
                if (element.form) {
                    console.log("adding lsd",linkedSchema.tableName +".0." + key)
                    setValue(linkedSchema.tableName + ".0." + key, element.sampleData);
                    setValue("bridgespans.0.clearspan",3)
                }
            }
        }
    }
    return setValue;


}