export const GetTableSelectQuery = (configSchema:any,objectId?:number, whereColumnName?:string ):any =>{
    
    const columnNames = []
    for (const key in configSchema.fields) {
        if (configSchema.fields[key].table ) {
            columnNames.push(key);


        }

    }
    if (whereColumnName) {
        const tableName = configSchema.tableName;
        const selectStatement = `SELECT ${columnNames.join(', ')} FROM ${tableName} WHERE ${whereColumnName} = ?`;
    
    
    
        return selectStatement;
    } else {
       const tableName = configSchema.tableName;
        const selectStatement = `SELECT ${columnNames.join(', ')} FROM ${tableName} `;
    
    
    
        return selectStatement;
    }




}