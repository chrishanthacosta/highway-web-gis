"use client"
import React, { useEffect, useState } from 'react';
import { getCulvert } from '../../../../components/features/items/culverts/actions-culvert';
import { GetSelectQuery } from '@/lib/system/sqlite-helpers/get-select-sqlite-stmt';
import { CulvertSchema } from '@/components/features/items/culverts/culvert-schema';
import { CulvertFormv2 } from '@/components/features/items/culverts/culvert-formv2';

export default function Page({ params }: { params: { id: string } }) {
    const [culvert, setCulvert] = useState<any>({});

    useEffect(() => {
        const fetchCulvert = async () => {
            const mainSql = GetSelectQuery(CulvertSchema, Number(params.id), "id");
            const spansSql = GetSelectQuery(CulvertSchema.linkedSchemas[0], Number(params.id), 'culvertid');

            const culvertData = await getCulvert(Number(params.id), mainSql, spansSql);

            console.log("culvertData", culvertData.data)


            setCulvert(culvertData.data);
        };

        fetchCulvert();
    }, [params.id]);

    return <div>
       
        <CulvertFormv2 id1={Number(params.id)} data1={culvert} />

    </div>;
}