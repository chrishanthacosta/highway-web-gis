"use client"
import React, { useEffect, useState } from 'react';
import { getBridge } from '../../../../components/features/items/bridges/actions-bridge';
import { GetSelectQuery } from '@/lib/system/sqlite-helpers/get-select-sqlite-stmt';
import { BridgeSchema } from '@/components/features/items/bridges/bridge-schema';
import { BridgeFormv2 } from '@/components/features/items/bridges/bridge-formv2';

export default function Page({ params }: { params: { id: string } }) {
    const [bridge, setBridge] = useState<any>({});

    useEffect(() => {
        const fetchBridge = async () => {
            const mainSql = GetSelectQuery(BridgeSchema, Number(params.id), "id");
            const spansSql = GetSelectQuery(BridgeSchema.linkedSchemas[0], Number(params.id), 'bridgeid');

            const bridgeData = await getBridge(Number(params.id), mainSql, spansSql);

            console.log("bridgeData", bridgeData.data,)


            setBridge(bridgeData.data);
        };

        fetchBridge();
    }, [params.id]);

    return <div>
         
        <BridgeFormv2 id1={params.id.toString()} data1={bridge} />

    </div>;
}