

export const BridgeSchema = {
    tableName: "bridges",
    fields: {
        id: { columnName:"id",dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true },
        location: { columnName:"location",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Location", placeholder: "location", null: false, default: "" },
        roadName: { columnName:"roadName",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Road Name", placeholder: "Road Name", default: "kurunegala" },
        eeDivision: { columnName:"eeDivision",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "EE Division", placeholder: "EE Division" },
        constructedYear: { columnName:"constructedYear",dataType: "INTEGER", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Constructed Year", placeholder: "constructed year" },
        spanCount: { columnName:"spanCount",dataType: "INTEGER", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Span Count", placeholder: "span count...",default: 1 },
        bridgeWidth: { columnName:"bridgeWidth",dataType: "REAL", inputType: "number", required: true,   db: true, form: true, label: "Bridge Width", placeholder: "bridge width...",  },
        bridgeOverallWidth: { columnName:"bridgeOverallWidth",dataType: "REAL", inputType: "number", required: true,   db: true, form: true, label: "Bridge Overall Width", placeholder: "overall bridge width...",  },
        carriagewayWidth: { columnName:"carriagewayWidth",dataType: "REAL", inputType: "number", required: true,   db: true, form: true, label: "Carriageway Width", placeholder: "carriageway width...",  },
        footWalkLhsWidth: { columnName:"footWalkLhsWidth",dataType: "REAL", inputType: "number",     db: true, form: true, label: "footWalk Lhs Width", placeholder: "footWalk Lhs Width...",  },
        footWalkRhsWidth: { columnName:"footWalkRhsWidth",dataType: "REAL", inputType: "number",     db: true, form: true, label: "FootWalk Rhs Width", placeholder: "footWalk Rhs Width...",  },
        crossingDetails: { columnName: "crossingDetails", dataType: "STRING", inputType: "text", db: true, form: true, label: "Crossing Details", placeholder: "Crossing Details" },
         riverWidth: { columnName:"riverWidth",dataType: "REAL", inputType: "number",     db: true, form: true, label: "riverWidth", placeholder: "river width...",  },
        riverDepth: { columnName: "riverDepth", dataType: "REAL", inputType: "number", db: true, form: true, label: "River Depth", placeholder: "river depth...", },
         paintingAreaSteel: { columnName:"paintingAreaSteel",dataType: "REAL", inputType: "number",     db: true, form: true, label: "painting Area Steel", placeholder: "painting Area Steel...",  },
         paintingAreaConcrete: { columnName:"paintingAreaConcrete",dataType: "REAL", inputType: "number",     db: true, form: true, label: "painting Area Concrete", placeholder: "painting Area Concrete...",  },
    },  
    linkedSchemas:[{
        tableName: "bridgespans",
        fields: {
            id: { columnName: "id", dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true },
            bridgeid:{columnName: "bridgeid", dataType: "INTEGER", db: true,fk:"id"},
            spanno: { columnName:"spanno",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "span no",   null: false,disabled:true,headerClassName:"w-20 bg-gray-300",className:"w-full"  },
            supportcenterspan: { columnName:"supportcenterspan",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "support center span", headerClassName:"min-w-60 bg-gray-300",className:"w-full"    },
            clearspan: { columnName:"clearspan",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "clearspan", placeholder: "",headerClassName:"min-w-60 bg-gray-300" ,className:"w-full" },
    },
    }]
}
