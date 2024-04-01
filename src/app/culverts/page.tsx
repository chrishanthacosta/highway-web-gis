import React, { useEffect, useState } from 'react';
// import { getBridge } from '../../components/features/items/culverts/actions-bridge';
import { CulvertsTable } from '../../components/features/items/culverts/culverts-table';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {

    return (<div className="flex flex-col items-center justify-center w-full">My culverts  <Button  ><Link href="/culverts/add">Add Bridge</Link ></Button>
        <CulvertsTable />
    </div>)
}