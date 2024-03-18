
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

// title: "Items", path: "/your-path", type: "dropdown",
//     children: {
//         title: "Select Item", links: [{ title: "Bridges", href: "/bridges/add" },
//         { title: "Culverts", href: "/culverts/add" }]
// }
export const GetDrpdownMenu = (item:any) => {
    

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>{item.title}</DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{item.children.title}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {item.children.links.map((link: any, index: number) => {
                    return (
                        <DropdownMenuItem key={index}>{
                            <Link href={link.href}>{link.title}</Link>
                        }</DropdownMenuItem>
                    )
                 })
                    
                    
                }
               
               
            </DropdownMenuContent>
        </DropdownMenu>
    )

}