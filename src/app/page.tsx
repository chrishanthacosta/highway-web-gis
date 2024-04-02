"use client"

import Image from "next/image";
// import MainNavbar from './../components/main-navbar/main-navbar';
// import { BridgeForm } from '../components/features/items/forms/bridge-form';
import { Button } from '@/components/ui/button';
import { createdb } from "../components/features/items/bridges/actions-bridge";
import ItemsMap from "@/components/features/items-map/item-map";
import { useItemsStore } from "@/components/features/items-map/item-store";
import { useEffect } from "react";

export default function Home() {
  const loadItems = useItemsStore((state) => state.loadItems);
  
  useEffect(() => {
    loadItems();
  },[])

  return (
    <>

      <div className="container mx-auto bg-gray-200 flex justify-center">
       
        <ItemsMap></ItemsMap>
      </div>
    </>
  );
}
