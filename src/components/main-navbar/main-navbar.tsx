"use client"

import { useState } from "react"
import Link from "next/link"
// import { Menu } from "lucide-react"
import { FaBars } from "react-icons/fa";
import { GetDrpdownMenu } from "@/lib/system/ui-helpers/get-dropdownMenu";
import Dropdown from "@/lib/ui-components/dropdown-menu";
import { Button } from "../ui/button";

export default function MainNavbar() {
  const [state, setState] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(null);


  const menus = [
    {
      title: "Bridges", path: "/your-path", type: "dropdown",
      menuData: {
        title: "Select Item", menuItems: [{ title: "List", href: "/bridges" },
          { title: "Add", href: "/bridges/add" }]
      }
    },
    {
      title: "Items", path: "/your-path", type: "dropdown",
      menuData: {
        title: "Select Item", menuItems: [{ title: "Culverts", href: "/culverts" },
        { title: "Add", href: "/culverts/add" }]
      }
    },
    { title: "DB", path: "/dev/table" },
    // { title: "DB", path: "/dev/table" },
    // { title: "Schema Gen", path: "/dev/schema" },
    { title: "Reports", path: "/your-path" },
    { title: "Contact Us", path: "/your-path" },
  ]

  const handleItemClick = (index: number) => {
    console.log("sel index", index)
    setSelectedIndex(index);
  };

  return (
    <nav className="flex flex-col bg-white w-full border-b md:border-0">
      <div className=" flex items-start md:items-center justify-between px-4 max-w-screen-xl mx-auto  md:px-8">
        <div id="logo" className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-3xl font-bold text-purple-600">RDA-Kurunegala</h1>
          </Link>

        </div>
        <div id="menu-list"
          className={`hidden flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 }`}
          // className={`flex-1   pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"}`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => {
              if (item.type === "dropdown") {
                return (
                  // GetDrpdownMenu(item)
                  <Dropdown key={idx} label={item.title} menuData={item.menuData} handleItemClick={handleItemClick} index={idx} selectedIndex={selectedIndex ?? 0}></Dropdown>
                )

              }
              else {
                return (
                  <li key={idx} className={`text-gray-600 hover:text-indigo-600 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedIndex === idx ? " border-b-4 border-red-800" : ""}`} onClick={() => { handleItemClick(idx) }}>
                    <Link href={item.path}>{item.title}</Link>
                  </li>
                )
              }
            })}
          </ul>
        </div>
        <div id="loginAndBars" className="flex">
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <FaBars />
            </button>
          </div>
          <button>Login</button>
        </div>

      </div>
      {/* {state && <div id="mobile-menu" className="flex flex-col gap-2   mb-2"> */}
      {state && <div id="mobile-menu" className="flex  gap-2 md:hidden mb-2">
        <Dropdown key="bridge" label="Bridge" menuData={menus[0]?.menuData} handleItemClick={handleItemClick} index={0} selectedIndex={0}></Dropdown>
        <Dropdown key="culvert" label="Culvert" menuData={menus[1]?.menuData} handleItemClick={handleItemClick} index={1} selectedIndex={1}></Dropdown>

        {/* <div className="flex gap-2"><Button variant={"secondary"}>Bridge List</Button><Button>Add Bridge</Button>  </div>
        <div className="flex gap-2"><Button variant={"secondary"}>Culvert List</Button><Button>Add Culvert</Button>  </div> */}

      </div>}
    </nav>
  )
}