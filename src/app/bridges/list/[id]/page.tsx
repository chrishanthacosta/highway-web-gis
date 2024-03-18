"use client"
import React, { useEffect, useState } from 'react';
import { getBridge } from '../../../../actions/bridges/actions-bridge';
import { GetSelectQuery } from '@/lib/system/sqlite-helpers/get-select-sqlite-stmt';
import { BridgeSchema } from '@/schemas/bridge-schema';
import { BridgeFormv2 } from '@/components/features/items/forms/bridge-formv2';

export default function Page({ params }: { params: { id: string } }) {
    const [bridge, setBridge] = useState<any>({});

    useEffect(() => {
        const fetchBridge = async () => {
            const mainSql = GetSelectQuery(BridgeSchema,Number(params.id),  "id");
            const spansSql = GetSelectQuery(BridgeSchema.linkedSchemas[0], Number(params.id), 'bridgeid');

            const bridgeData = await getBridge(Number(params.id), mainSql, spansSql);

            console.log("bridgeData", bridgeData.data,)


            setBridge(bridgeData.data);
        };

        fetchBridge();
    }, [params.id]);

    return <div>
        <p>id based</p>
        <BridgeFormv2 id1={params.id.toString()} data1={bridge} />

    </div>;
}