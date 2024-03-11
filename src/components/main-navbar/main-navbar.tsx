"use client"

import { useState } from "react"
import Link from "next/link"
// import { Menu } from "lucide-react"
import { FaBars } from "react-icons/fa";

export default function MainNavbar() {
  const [state, setState] = useState(false)

  const menus = [
    { title: "Items", path: "/your-path" },
    { title: "DB", path: "/db" },
    { title: "Reports", path: "/your-path" },
    { title: "Contact Us", path: "/your-path" },
  ]

  return (
    <nav className="bg-white w-full border-b md:border-0">
      <div className=" items-start md:items-center justify-between px-4 max-w-screen-xl mx-auto flex md:px-8">
        <div id="logo" className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-3xl font-bold text-purple-600">Logo</h1>
          </Link>
       
        </div>
        <div id="menu-list"
          className={`flex-1   pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? "block" : "hidden"
            }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-gray-600 hover:text-indigo-600">
                <Link href={item.path}>{item.title}</Link>
              </li>
            ))}
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
    </nav>
  )
}