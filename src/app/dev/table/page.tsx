"use client"

import { Button } from '@/components/ui/button';
import { createTableSqlite } from '@/lib/system/db-table-creation/create-table-sqlite';
// import { BridgeSchema } from '@/schemas/bridge-schema';
import { SchemaIndex } from '@/components/features/tablegen/schema-index';
import React from 'react';
import dynamic from 'next/dynamic'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const Page = () => {
    const [selectedSchema, setSelectedSchema] = React.useState<string>("");

    const handleSchemaChange = (value: string) => {
        setSelectedSchema(value);
    };


    // Add your component logic here
    const createTable = async () => {
        try {
            const schemaRef: any = SchemaIndex.find(s => s.schemaName === selectedSchema);

            if (schemaRef?.ref) {
                const d = await createTableSqlite(schemaRef?.ref);
            } else {
                alert("no ref found for schema main");
            }
            alert("success creating main table:");

            //create linked schemas

            schemaRef.ref.linkedSchemas.map(async (schema: any) => {
                const d = await createTableSqlite(schema);
                alert("success creating linked table:");
            })



        } catch (error) {
            console.error("Error creating main table:", error);
        }








    }
    return (
        <div className='flex flex-col items-center justify-center w-full'>
            <h1>db admin</h1>

            <Select onValueChange={handleSchemaChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a Schema" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Schemas</SelectLabel>
                        {
                            SchemaIndex.map(s => (
                                <SelectItem key={s.schemaName} value={s.schemaName}>{s.schemaName}</SelectItem>

                            ))

                        }

                    </SelectGroup>
                </SelectContent>
            </Select>

            <Button onClick={createTable} className='mt-8'>create {selectedSchema} table</Button>
        </div>
    );
};

export default Page; 