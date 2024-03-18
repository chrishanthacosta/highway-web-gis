import Image from "next/image";
// import MainNavbar from './../components/main-navbar/main-navbar';
// import { BridgeForm } from '../components/features/items/forms/bridge-form';
import { Button } from '@/components/ui/button';
import { BridgeFormv2 } from "@/components/features/items/forms/bridge-formv2";

export default function Page() {

 
  return (
    <>

      <div className="container mx-auto bg-gray-200 flex justify-center">
            <p>aaaaaa</p>
              <BridgeFormv2   />
        {/* <Button onClick={c}  >db create </Button> */}
      </div>
    </>
  );
}