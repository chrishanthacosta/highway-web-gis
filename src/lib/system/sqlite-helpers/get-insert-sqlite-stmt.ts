 
//generate insert query column names list
export const GetInsertSqliteStatement = (configurationSchema: any, data: any) => {
    console.log("pppo",)
    const columnNames = []
    const columnValues = []
    let errorMsg = ""
    let linkedErrorMsg =""
   
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



    const tableName = configurationSchema.tableName;
    const insertStatementMain = `INSERT INTO ${tableName} (${columnNames.join(', ')}) VALUES (${columnValues.map(value => '?').join(', ')})`;
    //linked schemas

    const linkedSchemas = configurationSchema.linkedSchemas;
    const linkedInsertStatements = linkedSchemas.map((linkedSchema: any,schemaIndex:number) => {
        const linkedTableName = linkedSchema.tableName;
        // const linkedColumnNames = [];
        // const linkedColumnValues = [];
         const linkedSchemaErrorMsgs : any[]=[]
        //ITERATE ROW WISE
        const lSchemaDataRows = data[linkedTableName]; //array 
        const fkFieldName= linkedSchemas[schemaIndex].fkColumnName;
        const lSchemaPreparedObjRows = lSchemaDataRows.map((row :any,index:number) => {
            let insertSection = "";
            let valueSection = "";
            
            let linkedColumnNames =[]
            let linkedColumnValues =[]
            for (const key in linkedSchema.fields) {
                    
                    if (linkedSchema.fields[key].db && !linkedSchema.fields[key].pk) {
                        const defaultValue = linkedSchema.fields[key].default;
                
                        if (row[key] !== undefined && row[key] !== null) {
                            linkedColumnNames.push(key);
                            linkedColumnValues.push(row[key]);
                        } else if (defaultValue !== undefined && defaultValue !== null) {
                            linkedColumnNames.push(key);
                            linkedColumnValues.push(defaultValue);
                        } else {
                            if (linkedSchema.fields[key].null == false) {
                                linkedErrorMsg+= key + " is required";
                            }
                        }
                    }
                }   
            insertSection = `INSERT INTO ${linkedTableName} (${fkFieldName},${linkedColumnNames.join(', ')}) VALUES ( ?,`;
            valueSection = `${linkedColumnValues.map(value => '?').join(', ')})`;
            
            linkedSchemaErrorMsgs.push(linkedErrorMsg);
            return { insertStatement: insertSection + valueSection ,dataValues:linkedColumnValues}

        })
        
        return { lSchemaPreparedObjRows ,errorMsgs:linkedSchemaErrorMsgs}
       
    });

    return { insertStatementMain,dataValuesMain:columnValues  , linkedInsertStatements, errorMsg };

    //return { columnNames, columnValues, errorMsg };

}

