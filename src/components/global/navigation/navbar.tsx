import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { AlignRight, BadgeCheck, ChevronsUpDown, CircleUserRound, ScrollText, UserRound } from "lucide-react"
import avatar from "@/assets/img/avatar.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
    isInDashboard?: boolean
    isLoggedIn?: boolean
}

export default function Navbar({ isInDashboard = true, isLoggedIn = false }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    function toggleNavbar() { setIsOpen(!isOpen) }

    return <>
        <nav className="p-3 flex flex-col lg:flex-row items-center bg-white border-b border-sky-400 sticky top-0 z-50">
            <section className="flex flex-row items-center justify-between w-full lg:w-auto">
                {!isInDashboard && <Link to={`/`}><h1 className="text-2xl font-bold blu-gradient-text">Reflex</h1></Link>}
                <Button size={'icon'} variant={`ghost`} onClick={toggleNavbar} className="lg:hidden"><AlignRight /></Button>
            </section>

            {isOpen && <section className="flex flex-col lg:flex-row items-center justify-between w-full">
                <div className="flex flex-col lg:flex-row lg:ml-5 text-center">
                    {isInDashboard
                        ? <>
                            <Link to={`/`}><Button variant="link">Home</Button></Link>
                            <Link to={`#`}><Button variant="link">Portfolio</Button></Link>
                            <Link to={`examples`}><Button variant="link">Examples</Button></Link>
                        </>
                        : <>
                            <Link to={`#`}><Button variant="link">About</Button></Link>
                        </>}

                </div>
                <div className="my-5 lg:my-0">
                    {isLoggedIn
                        ? <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Button variant={"outline"} className="font-semibold flex gap-3 items-center max-w-64">
                                    <Avatar className="w-6 h-6 shadow shadow-sky-200">
                                        <AvatarImage src={avatar} />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    Alicia Hartono
                                    <ChevronsUpDown color="blue" size={14} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem><CircleUserRound size={16} color="gray" className="mr-2" /> Profile</DropdownMenuItem>
                                <DropdownMenuItem><ScrollText size={16} color="gray" className="mr-2" /> Billing</DropdownMenuItem>
                                <DropdownMenuItem><UserRound size={16} color="gray" className="mr-2" /> Team</DropdownMenuItem>
                                <DropdownMenuItem><BadgeCheck size={16} color="gray" className="mr-2" /> Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        : <Link to={`#`}><Button className="font-semibold blu-gradient-text" variant="outline">Login</Button></Link>}
                </div>
            </section>}
        </nav>
    </>
}