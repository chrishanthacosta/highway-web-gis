import React, { useEffect, useState } from 'react';
import { getBridge } from '../../actions/bridges/actions-bridge';
import { BridgesTable } from './../../components/features/items/tables/bridges-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {

    return (<div className="flex flex-col items-center justify-center w-full">My bridges  <Button  ><Link href="/bridges/add">Add Bridge</Link ></Button>
        <BridgesTable/>
    </div>)
}