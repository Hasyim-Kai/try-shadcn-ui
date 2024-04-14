
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CircleUser, Command } from "lucide-react"
import { Link, } from "react-router-dom"

interface Props {
    sidebarOpen: boolean
}

export default function Sidebar({ sidebarOpen, }: Props) {
    const sidebarList = [
        { icon: <Command className="min-w-4 min-h-4 w-4 h-4" />, text: `Project`, link: `project` },
        { icon: <CircleUser className="min-w-4 min-h-4 w-4 h-4" />, text: `User`, link: `user` },
    ]

    return <nav className={`fixed h-full border-r bg-white border-sky-400 flex flex-col p-3 ${sidebarOpen ? 'w-64' : 'w-16'} smooth`}>
        {sidebarList.map((item, index) => <Link className="" to={item.link} key={index}>
            <Button variant={`ghost`} className={`w-full group px-3 flex gap-3 h-12 justify-start overflow-hidden`}>
                {item.icon}
                <span className={cn(
                    'text-base smooth',
                    !sidebarOpen && `text-background opacity-0 transition-all smooth`,
                )}>
                    {item.text}
                </span>
            </Button>
        </Link>
        )}
    </nav>
}