"use client"

import Image from "next/image";
// import MainNavbar from './../components/main-navbar/main-navbar';
// import { BridgeForm } from '../components/features/items/forms/bridge-form';
import { Button } from '@/components/ui/button';
import { createdb } from "../components/features/items/bridges/actions-bridge";
import ItemsMap from "@/components/features/items-map/item-map";

export default function Home() {

  const c = async () => {
    const d = await createdb()
    console.log("d", d)
  }
  return (
    <>

      <div className="container mx-auto bg-gray-200 flex justify-center">
       
        <ItemsMap></ItemsMap>
      </div>
    </>
  );
}
