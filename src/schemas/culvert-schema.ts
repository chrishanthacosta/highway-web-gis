

export const CulvertSchema = {
    tableName: "culverts",
    fields: {
        id: { dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true },
        location: { dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Location", placeholder: "location", null: false, default: "" },
        roadName: { dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Road Name", placeholder: "Road Name", default: "kurunegala" },
        eeDivision: { dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "EE Division", placeholder: "EE Division" },
        constructedYear: { dataType: "INTEGER", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Constructed Year", placeholder: "constructed year" },
    }
}