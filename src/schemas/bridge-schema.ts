
//schema guide line
// 1. in linked schemas second field is always the fk field

export const BridgeSchema = {
    tableName: "bridges",
    fields: {
        id: { columnName:"id",dataType: "INTEGER",table:true, required: true, db: true, auto: true, pk: true, null: false, unique: true, sampleData: 2 },
        location: { columnName:"location",dataType: "STRING",table:true, inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Location", placeholder: "location", null: false, default: "", sampleData: "location" },
        roadName: { columnName:"roadName",dataType: "STRING",table:true, inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Road Name", placeholder: "Road Name", default: "kurunegala", sampleData: "roadName" },
        eeDivision: { columnName:"eeDivision",dataType: "STRING",table:true, inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "EE Division", placeholder: "EE Division", sampleData: "eeDivision" },
        constructedYear: { columnName:"constructedYear",dataType: "INTEGER",table:true, inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Constructed Year", placeholder: "constructed year", sampleData: 1234 },
        spanCount: { columnName:"spanCount",dataType: "INTEGER",table:true, inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Span Count", placeholder: "span count...",default: 1, sampleData: 0},
        bridgeWidth: { columnName:"bridgeWidth",dataType: "REAL", inputType: "number", required: true,   db: true, form: true, label: "Bridge Width", placeholder: "bridge width...", sampleData: 4 },
        bridgeOverallWidth: { columnName:"bridgeOverallWidth",dataType: "REAL", inputType: "number", required: true,   db: true, form: true, label: "Bridge Overall Width", placeholder: "overall bridge width...", sampleData: 5 },
        carriagewayWidth: { columnName:"carriagewayWidth",dataType: "REAL", inputType: "number", required: true,   db: true, form: true, label: "Carriageway Width", placeholder: "carriageway width...", sampleData: 6 },
        footWalkLhsWidth: { columnName:"footWalkLhsWidth",dataType: "REAL", inputType: "number",     db: true, form: true, label: "footWalk Lhs Width", placeholder: "footWalk Lhs Width...", sampleData: 1 },
        footWalkRhsWidth: { columnName:"footWalkRhsWidth",dataType: "REAL", inputType: "number",     db: true, form: true, label: "FootWalk Rhs Width", placeholder: "footWalk Rhs Width...", sampleData: 2 },
        crossingDetails: { columnName: "crossingDetails", dataType: "STRING", inputType: "text", db: true, form: true, label: "Crossing Details", placeholder: "Crossing Details", sampleData: "crossingDetails" },
        riverWidth: { columnName:"riverWidth",dataType: "REAL", inputType: "number",     db: true, form: true, label: "riverWidth", placeholder: "river width...", sampleData: 5 },
        riverDepth: { columnName: "riverDepth", dataType: "REAL", inputType: "number", db: true, form: true, label: "River Depth", placeholder: "river depth...", sampleData: 6 },
        paintingAreaSteel: { columnName:"paintingAreaSteel",dataType: "REAL", inputType: "number",     db: true, form: true, label: "painting Area Steel", placeholder: "painting Area Steel...", sampleData: 6 },
        paintingAreaConcrete: { columnName:"paintingAreaConcrete",dataType: "REAL", inputType: "number",     db: true, form: true, label: "painting Area Concrete", placeholder: "painting Area Concrete...", sampleData: 3 },
    },  
    linkedSchemas:[{
        tableName: "bridgespans",
        fkColumnName:"bridgeid",
        fields: {
            id: { columnName: "id", dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true, sampleData: 3 },
            bridgeid:{columnName: "bridgeid", dataType: "INTEGER", db: true,fk:"id", sampleData: 4},
            spanno: { columnName:"spanno",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "span no",   null: false,disabled:true,headerClassName:"w-20 bg-gray-300",inputClassName:"w-20 bg-yellow-600",divClassName:"w-20", sampleData: "1" },
            supportcenterspan: { columnName:"supportcenterspan",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "support center span", headerClassName:"min-w-60 bg-gray-300",inputClassName:"w-60 bg-blue-600",divClassName:"w-60", sampleData: 2 },
            clearspan: { columnName:"clearspan",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "clearspan", placeholder: "",headerClassName:"min-w-60 bg-gray-300" ,inputClassName:"w-60 bg-red-600",divClassName:"w-60 border border-blue-400", sampleData: 3 },
        },
         
    }]
}

 const panel1Coloumn1 = {
     rows: [{name:"roadName",className:"w-full"},{name:"location",className:"w-full"}],
     className:"w-full md:w-1/3   md:min-w-80 "
}

 const panel1Coloumn2 = {
     rows: [{name:"constructedYear",className:"w-full"},{name:"eeDivision",className:"w-full"}],
     className:"w-full md:w-1/3   md:min-w-80"
}

 const panel2Coloumn1 = {
     rows: [{name:"spanCount",className:"max-w-80"} ,{name:"bridgespans",className:"w-full"}],
     className:"max-w-[400]   "
}

export const BridgeFormUiSchema = {
    panels: [
        {columns:[panel1Coloumn1,panel1Coloumn2],className:"flex gap-2 justify-center flex-wrap  w-full",columnContainerClassName:"flex justify-center w-full"},
        {columns:[panel2Coloumn1 ],className:"flex justify-center w-full",columnContainerClassName:"flex justify-center w-1/3"},
         
    ]
}
