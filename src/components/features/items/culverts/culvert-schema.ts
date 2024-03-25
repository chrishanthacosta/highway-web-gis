

export const CulvertSchema = {
    tableName: "culverts",
    fields: {
        id: { dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true },
        location: { dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Location", placeholder: "location", null: false, default: "" },
        roadName: { dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Road Name", placeholder: "Road Name", default: "kurunegala" },
        eeDivision: { dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "EE Division", placeholder: "EE Division" },
        constructedYear: { dataType: "INTEGER", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Constructed Year", placeholder: "constructed year" },
        lat:{columnName:"lat",dataType:"REAL",table:false,inputType:"number",required:false,form:true,db:true,label:"lat",placeholder:23.4,sampleData:23.4},
        long:{columnName:"long",dataType:"REAL",table:false,inputType:"number",required:false,form:true,db:true,label:"long",placeholder:"long",default:0,sampleData:0},
    }
}