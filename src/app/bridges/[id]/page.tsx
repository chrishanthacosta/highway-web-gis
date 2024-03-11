"use client"
import React, { useEffect, useState } from 'react';
import { getBridge } from '../../../actions/bridges/actions';

export default function Page({ params }: { params: { id: string } }) {
    const [bridge, setBridge] = useState<any>(null);

    useEffect(() => {
        const fetchBridge = async () => {
            const bridgeData = await getBridge(Number(params.id));
            setBridge(bridgeData);
        };

        fetchBridge();
    }, [params.id]);

    return <div>My bridge: {bridge}</div>;
}