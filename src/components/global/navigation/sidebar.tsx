
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { CircleUser, Swords } from "lucide-react"
import { Link, } from "react-router-dom"

interface Props {
    sidebarOpen: boolean
}

export default function Sidebar({ sidebarOpen, }: Props) {
    const sidebarList = [
        { icon: <Swords size={16} />, text: `Project`, link: `project` },
        { icon: <CircleUser size={16} />, text: `User`, link: `user` },
    ]

    return <nav className={`fixed h-full border-r bg-white border-sky-400 flex flex-col p-3 ${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-200`}>
        <Link to={`/`}><h1 className={`font-bold blu-gradient-text ${sidebarOpen ? 'text-4xl p-2' : 'text-3xl'} transition-all duration-300`}>{sidebarOpen ? 'Reflex' : 'Re'}</h1></Link>
        {sidebarList.map((item, index) => <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Link to={item.link} key={index}><Button className={`w-full gap-2 text-base ${sidebarOpen ? 'justify-start' : ''}`} variant="ghost" size={sidebarOpen ? "default" : "icon"}>
                        {item.icon}{sidebarOpen && item.text}
                    </Button></Link>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{item.text}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>)}
    </nav>
}