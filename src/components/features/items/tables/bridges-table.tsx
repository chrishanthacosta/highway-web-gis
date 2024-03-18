"use client"
import { GetBridges } from "@/actions/bridges/actions-bridge";
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
import { BridgeSchema } from "@/schemas/bridge-schema copy";
import { useEffect, useState } from "react";
import Link from 'next/link';

export const BridgesTable = () => {
    const [bridges,setbridges] = useState([])
    useEffect(() => {
        const fetchBridges = async ()=>{
                const mainSql = GetTableSelectQuery(BridgeSchema);
                const b = await GetBridges(mainSql)
                setbridges(b.data)

        }
          fetchBridges()
      
    },[])
    
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
                    <TableHead className="text-right">  span Count</TableHead>
                    <TableHead className="text-right">  Edit</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bridges.map((b:any)=> {   return    (
                    <TableRow key={b.id}>
                        <TableCell className="font-medium">{b.id}</TableCell>
                        <TableCell>{b.location}</TableCell>
                        <TableCell>{b.roadName}</TableCell>
                        <TableCell className="w-60">{b.eeDivision}</TableCell>
                        <TableCell className="text-right">{b.spanCount}</TableCell>
                        <TableCell className="text-right"><Link href={`/bridges/list/${b.id}`}>Edit</Link ></TableCell>
                    </TableRow>)
                    })
                }
            </TableBody>
        </Table>
         </div>
    )
}