

export const BridgeSchema = {
    tableName: "bridges",
    fields: {
        id: { columnName:"id",dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true },
        location: { columnName:"location",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Location", placeholder: "location", null: false, default: "" },
        roadName: { columnName:"roadName",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Road Name", placeholder: "Road Name", default: "kurunegala" },
        eeDivision: { columnName:"eeDivision",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "EE Division", placeholder: "EE Division" },
        constructedYear: { columnName:"constructedYear",dataType: "INTEGER", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Constructed Year", placeholder: "constructed year" },
        spanCount: { columnName:"spanCount",dataType: "INTEGER", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Span Count", placeholder: "span count...",default: 1 },
    },  
    linkedSchemas:[{
        tableName: "bridgespans",
        fields: {
            id: { columnName: "id", dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true },
            bridgeid:{columnName: "bridgeid", dataType: "INTEGER", db: true,fk:"id"},
            spanno: { columnName:"spanno",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "span no",   null: false,  },
            supportcenterspan: { columnName:"supportcenterspan",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "support center span",    },
            clearspan: { columnName:"clearspan",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "clearspan", placeholder: "" },
    },
    }]
}
