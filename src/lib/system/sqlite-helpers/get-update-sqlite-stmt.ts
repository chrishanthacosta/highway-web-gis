

  export const GetUpdateQuery = (configSchema:any,objId:number,dirtyValues:any) => {
    
    const columnName: string[] = [];
    const valuesMain: any[] = [];

    for (const prop in dirtyValues) {
        if (!Array.isArray(dirtyValues[prop])) {
            columnName.push(prop);
            valuesMain.push(dirtyValues[prop]);
        }
    }
    
      if(columnName.length!=0){
            let updateQueryMain = `UPDATE ${configSchema.tableName} SET `;
            for (let i = 0; i < columnName.length; i++) {
                updateQueryMain += `${columnName[i]} = ?, `;
            }
            updateQueryMain = updateQueryMain.slice(0, -2); // Remove the trailing comma and space
            updateQueryMain += ` WHERE id = ?`;

            valuesMain.push(objId);

            return { updateQueryMain,valuesMain }
        }else{

          return
        }
    
}

// export const GetObjectUpdateQuery = (configSchema: any, objId: number, dirtyValues: any) => {

//     const { updateQueryMain, valuesMain } = GetUpdateQuery(configSchema, objId, dirtyValues);

//     const updateQueries: any[] = [];

//     configSchema.linkedSchemas.forEach((linkedSchema: any) => {
//         const objArray = dirtyValues[linkedSchema.tableName]
//         for (const row of objArray) {
//             const { updateQuery, values } = GetUpdateQuery(linkedSchema, objId, row);
//         }

//         updateQueries.push({ updateQuery, values });
//     });

//     return updateQueries;



//     return { updateQuery: updateQueryMain, values: valuesMain };

    
// }


