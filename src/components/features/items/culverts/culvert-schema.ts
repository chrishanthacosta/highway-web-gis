

export const CulvertSchema = {
     tableName: "culverts",
    fields: {
        id: { columnName: "id", dataType: "INTEGER",inputType: "label", table: true, required: false, db: true,form:true, label: "Culvert Id",auto: true, pk: true, null: false, unique: true, },
        location: { columnName: "location", dataType: "STRING", table: true, inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Location", placeholder: "location", null: false, default: "", sampleData: "location" },
        roadName: { columnName: "roadName", dataType: "STRING", table: true, inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "Road Name", placeholder: "Road Name", default: "kurunegala", sampleData: "roadName" },
        eeDivision: { columnName: "eeDivision", dataType: "STRING", table: true, inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "EE Division", placeholder: "EE Division", sampleData: "eeDivision" },
        culvertType: { columnName: "culvertType", dataType: "STRING", table: true, inputType: "select", required: true, db: true, form: true, label: "Type",   sampleData: 1234 },
        openingCount: { columnName: "openingCount", dataType: "INTEGER", table: true, inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "Opening Count", placeholder: "openng count...", default: 1, sampleData: 1 },
        culvertWidth: { columnName: "culvertWidth", dataType: "REAL", inputType: "number", required: true, db: true, form: true, label: "culvert Width", placeholder: "culvertWidth...", sampleData: 4 },
        culvertOverallWidth: { columnName: "culvertOverallWidth", dataType: "REAL", inputType: "number", required: true, db: true, form: true, label: "culvertOverallWidth", placeholder: "culvertOverallWidth...", sampleData: 5 },
        carriagewayWidth: { columnName: "carriagewayWidth", dataType: "REAL", inputType: "number", required: true, db: true, form: true, label: "Carriageway Width", placeholder: "carriageway width...", sampleData: 6 },
        footWalkLhsWidth: { columnName: "footWalkLhsWidth", dataType: "REAL", inputType: "number", db: true, form: true, label: "footWalk Lhs Width", placeholder: "footWalk Lhs Width...", sampleData: 1 },
        footWalkRhsWidth: { columnName: "footWalkRhsWidth", dataType: "REAL", inputType: "number", db: true, form: true, label: "FootWalk Rhs Width", placeholder: "footWalk Rhs Width...", sampleData: 2 },
        crossingDetails: { columnName: "crossingDetails", dataType: "STRING", inputType: "text", db: true, form: true, label: "Crossing Details", placeholder: "Crossing Details", sampleData: "crossingDetails" },
        deckMaterial: { columnName: "deckMaterial", dataType: "STRING", inputType: "text", db: true, form: true, label: "deckMaterial", placeholder: "deckMaterial", sampleData: "deckMaterial" },
        abutmentMaterial: { columnName: "abutmentMaterial", dataType: "STRING", inputType: "text", db: true, form: true, label: "abutment Material", placeholder: "abutment Material", sampleData: "abutmentMaterial" },
        wingWallMaterial: { columnName: "wingWallMaterial", dataType: "STRING", inputType: "text", db: true, form: true, label: "wingWall Material", placeholder: "wingWall Material", sampleData: "wingWallMaterial" },
        channelWidth: { columnName: "riverWidth", dataType: "REAL", inputType: "number", db: true, form: true, label: "riverWidth", placeholder: "river width...", sampleData: 5 },
        invertHeight: { columnName: "riverDepth", dataType: "REAL", inputType: "number", db: true, form: true, label: "River Depth", placeholder: "river depth...", sampleData: 6 },
        paintingAreaSteel: { columnName: "paintingAreaSteel", dataType: "REAL", inputType: "number", db: true, form: true, label: "painting Area Steel", placeholder: "painting Area Steel...", sampleData: 6 },
        paintingAreaConcrete: { columnName: "paintingAreaConcrete", dataType: "REAL", inputType: "number", db: true, form: true, label: "painting Area Concrete", placeholder: "painting Area Concrete...", sampleData: 3 },
        latitude: { columnName: "latitude", dataType: "REAL", table: true, inputType: "number", required: false, form: true, db: true, label: "Latitude", placeholder: "latitude..", default: 0, sampleData: 56 },
        longitude:{columnName:"longitude",dataType:"REAL",table:true,inputType:"number",required:false,form:true,db:true,label:"Longitude",placeholder:"longitude",default:0,sampleData:78},
        setlocation: { columnName: "setlocation", dataType: "COMPONENT",table:false,inputType:"number",required:false,form:true,db:false,label:"setlocation",placeholder:"setlocation",default:0,sampleData:78},
    },  
    linkedSchemas:[{
        tableName: "culvertspans",
        fkColumnName:"culvertid",
        fields: {
            id: { columnName: "id", dataType: "INTEGER", required: true, db: true, auto: true, pk: true, null: false, unique: true, sampleData: 3 },
            culvertid:{columnName: "culvertid", dataType: "INTEGER", db: true,fk:"id", sampleData: 4},
            spanno: { columnName:"spanno",dataType: "STRING", inputType: "text", required: true, max: 100, min: 0, db: true, form: true, label: "span no",   null: false,disabled:true,headerClassName:"w-20 bg-gray-300",inputClassName:"w-20 bg-yellow-600",divClassName:"w-20", sampleData: "1" },
            supportcenterspan: { columnName:"supportcenterspan",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "support center span", headerClassName:"min-w-60 bg-gray-300",inputClassName:"w-60 bg-blue-600",divClassName:"w-60", sampleData: 2 },
            clearHeight: { columnName:"clearHeight",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "sclearHeight", headerClassName:"min-w-60 bg-gray-300",inputClassName:"w-60 bg-blue-600",divClassName:"w-60", sampleData: 2 },
            clearspan: { columnName:"clearspan",dataType: "REAL", inputType: "number", required: true, max: 100, min: 0, db: true, form: true, label: "clearspan", placeholder: "",headerClassName:"min-w-60 bg-gray-300" ,inputClassName:"w-60 bg-red-600",divClassName:"w-60 border border-blue-400", sampleData: 3 },
        },
         
    }]
}

 const panel0Coloumn1 = {
     rows: [{ name: "id", className: "w-full" },],
     className:"w-full md:w-1/3   md:min-w-80 "
}
 const panel1Coloumn1 = {
     rows: [{ name: "roadName", className: "w-full" }, { name: "location", className: "w-full" }, { name: "culvertWidth", className: "w-full" }, { name: "carriagewayWidth", className: "w-full " }, { name: "crossingDetails", className: "w-full " }, { name: "invertHeight", className: "w-full " }, { name:"paintingAreaConcrete",className:"w-full "}, { name:"paintingAreaSteel",className:"w-full "}],
     className:"w-full md:w-1/3   md:min-w-80 "
}

 const panel1Coloumn2 = {
     rows: [{ name: "culvertType", className: "w-full" }, { name: "eeDivision", className: "w-full" }, { name: "culvertOverallWidth", className: "w-full" }, { name: "footWalkLhsWidth", className: "w-full " }, { name: "footWalkRhsWidth", className: "w-full " }, { name: "channelWidth", className: "w-full " },{ name: "deckMaterial", className: "w-full " },{ name: "abutmentMaterial", className: "w-full " },{ name: "wingWallMaterial", className: "w-full " },],
     className:"w-full md:w-1/3   md:min-w-80"
}

 const panel2Coloumn1 = {
     rows: [{name:"longitude",className:"max-w-80"} ,],
     className:"max-w-[400]   "
}
 const panel2Coloumn2 = {
     rows: [{name:"latitude",className:"max-w-80"} ,],
     className:"max-w-[400]   "
}
 const panel2Coloumn3 = {
     rows: [{name:"setlocation",className:"flex items-center max-w-80 ml-4"} ,],
     className:"flex items-center max-w-[400]   "
}
 const panel3Coloumn1 = {
     rows: [{name:"openingCount",className:"max-w-80"} ,{name:"culvertspans",className:"w-full"}],
     className:"max-w-[400]   "
}

export const CulvertFormUiSchema = {
    panels: [
        {columns:[panel0Coloumn1],className:"flex gap-2 justify-center flex-wrap  w-full",columnContainerClassName:"flex justify-center w-full"},
        {columns:[panel1Coloumn1,panel1Coloumn2],className:"flex gap-2 justify-center flex-wrap  w-full",columnContainerClassName:"flex justify-center w-full"},
        {columns:[panel2Coloumn1,panel2Coloumn2,panel2Coloumn3 ],className:"flex gap-2 justify-center items-center flex-wrap  w-full",columnContainerClassName:"flex justify-center items-center w-full"},
        {columns:[panel3Coloumn1 ],className:"flex justify-center w-full",columnContainerClassName:"flex justify-center w-1/3"},
         
    ]
}
