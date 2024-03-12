

export const TableGenSchema = {
    tableName: "tablegenheader",
    fields: {
        id: { columnName:"id",dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true },
        tablename: { columnName:"tablename",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Table name", placeholder: "table name...", null: false, default: "" },
    },
    
}