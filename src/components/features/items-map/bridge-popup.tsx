"use client"

import { useEffect, useState } from "react";
import { getBridge } from "../items/bridges/actions-bridge"
import { GetSelectQuery } from "@/lib/system/sqlite-helpers/get-select-sqlite-stmt";
import { BridgeSchema } from "../items/bridges/bridge-schema";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PhotoBrowser } from "@/components/features/items/photos/photo-card";

const tab1 = ["id", "location", "roadName", "eeDivision", "constructedYear", "spanCount", "bridgeWidth", "bridgeOverallWidth", "carriagewayWidth",]
const tab2 = ["footWalkLhsWidth", "footWalkRhsWidth", "crossingDetails", "riverWidth", "riverDepth", "paintingAreaSteel", "paintingAreaConcrete", "footWalkRhsWidth", "crossingDetails"]


export const BridgePopup = ({ id }: { id: number }) => {

    const [bridge, setBridge] = useState<any>({})

    useEffect(() => {
        const fetchBridge = async () => {
            const mainSql = GetSelectQuery(BridgeSchema, id, "id");
            const spansSql = GetSelectQuery(BridgeSchema.linkedSchemas[0], id, 'bridgeid');
            const bridgeData = await getBridge(id, mainSql, spansSql);
            setBridge(bridgeData.data);
        };

        fetchBridge();
    }, [id]);

    return (
        <div className="w-3/4">

            <h1>Bridge Info</h1>
            <Tabs defaultValue="general" className="w-[30vw]">
                <TabsList>
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="photo">Photo</TabsTrigger>
                </TabsList>
                <TabsContent value="general">
                    <Table  >

                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10vw]">Item</TableHead>
                                <TableHead>Description</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tab1.map((b: string) => {
                                return (
                                    <TableRow key={b}>
                                        <TableCell className="font-medium p-1">{bridge[b] instanceof Object ? null : BridgeSchema.fields[b].label}</TableCell>
                                        <TableCell className="font-medium p-1">{bridge[b] instanceof Object ? null : bridge[b]}</TableCell>
                                    </TableRow>)
                            })
                            }
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="details">
                    <Table  >

                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[10vw]">Item</TableHead>
                                <TableHead>Descriptio</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tab2.map((b: string) => {
                                return (
                                    <TableRow key={b}>
                                        <TableCell className="font-medium p-1">{bridge[b] instanceof Object ? null : BridgeSchema.fields[b].label}</TableCell>
                                        <TableCell className="font-medium p-1">{bridge[b] instanceof Object ? null : bridge[b]}</TableCell>
                                    </TableRow>)
                            })
                            }
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="photo">

                    <PhotoBrowser linkid={bridge.id}></PhotoBrowser>

                </TabsContent>
            </Tabs>



        </div>
    )
}