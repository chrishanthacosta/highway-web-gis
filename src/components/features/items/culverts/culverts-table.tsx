"use client"
import { GetCulverts } from "@/components/features/items/culverts/actions-culvert";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { GetSelectQuery } from "@/lib/system/sqlite-helpers/get-select-sqlite-stmt";
import { GetTableSelectQuery } from "@/lib/system/sqlite-helpers/get-table-select-stmt";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { CulvertSchema } from "./culvert-schema";

export const CulvertsTable = () => {
    const [culverts, setculverts] = useState([])
    useEffect(() => {
        const fetchCulverts = async () => {
            const mainSql = GetTableSelectQuery(CulvertSchema);
            const b = await GetCulverts(mainSql)
            setculverts(b.data)

        }
        fetchCulverts()

    }, [])

    return (
        <div className="w-3/4">
            <Table  >
                <TableCaption>List of Bridges.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Id</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Road Name</TableHead>
                        <TableHead className="text-right">EE Division</TableHead>
                        <TableHead className="text-right">  Open Count</TableHead>
                        <TableHead className="text-right">  Edit</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {culverts.map((b: any) => {
                        return (
                            <TableRow key={b.id}>
                                <TableCell className="font-medium">{b.id}</TableCell>
                                <TableCell>{b.location}</TableCell>
                                <TableCell>{b.roadName}</TableCell>
                                <TableCell className="w-60">{b.eeDivision}</TableCell>
                                <TableCell className="text-right">{b.spanCount}</TableCell>
                                <TableCell className="text-right"><Link href={`/culverts/list/${b.id}`}>Edit</Link ></TableCell>
                            </TableRow>)
                    })
                    }
                </TableBody>
            </Table>
        </div>
    )
}