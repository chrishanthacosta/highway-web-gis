
//generate insert query column names list
export const GetSqlStatement = (configurationSchema: any, data: any) => {
    const columnNames = []
    const columnValues = []
    let errorMsg= ""
    for (const key in configurationSchema.fields) {
        if (configurationSchema.fields[key].db && !configurationSchema.fields[key].pk ) {

            const defaultValue = configurationSchema.fields[key].default

            if (data[key] !== undefined && data[key] !== null) {
                columnNames.push(key);
                columnValues.push(data[key]);
            } else if (defaultValue !== undefined && defaultValue !== null) {

                columnNames.push(key);
                columnValues.push(defaultValue);
            } else {
                if (configurationSchema.fields[key].null==false) {
                    errorMsg += key + " is required;";
                }  
            }

            
        } 
    }

    return { columnNames, columnValues, errorMsg };

    



}