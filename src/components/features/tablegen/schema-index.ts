import { BridgeSchema } from "../items/bridges/bridge-schema";
import { CulvertSchema } from "../items/culverts/culvert-schema";
import { TableGenSchema } from "./tablegen-schema";

//schemaName should be equal to first part of file name of that schema =>bridge-schema.ts
export const SchemaIndex = [{ schemaName: "bridge", ref: BridgeSchema },
{ schemaName: "culvert", ref: CulvertSchema },
{ schemaName: "tablegen", ref: TableGenSchema },
]