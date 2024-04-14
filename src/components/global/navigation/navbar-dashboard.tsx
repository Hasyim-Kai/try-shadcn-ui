import { Button } from "../../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { AlignRight, BadgeCheck, ChevronLeft, ChevronRight, ChevronsUpDown, CircleUserRound, ScrollText, UserRound } from "lucide-react"
import avatar from "@/assets/img/avatar.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom";
import { useState } from "react";

interface Props {
    isSidebarOpen: boolean
    toggleSidebarFn: () => void
    isLoggedIn?: boolean
}

export default function NavbarDashboard({ isSidebarOpen = true, toggleSidebarFn, isLoggedIn = false }: Props) {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    function toggleNavbar() { setIsOpen(!isOpen) }

    return <>
        <nav className="h-[4rem] px-3 flex flex-col lg:flex-row items-center bg-white border-b border-sky-400 sticky top-0 z-50">
            <section className="flex flex-row items-center justify-between w-full lg:w-auto">
                <Button size={"icon"} variant={"outline"} onClick={toggleSidebarFn}>{isSidebarOpen ? <><ChevronLeft /> </> : <ChevronRight />}</Button>
                <Button size={'icon'} variant={`ghost`} onClick={toggleNavbar} className="lg:hidden"><AlignRight /></Button>
            </section>

            {isOpen && <section className="flex flex-col lg:flex-row items-center justify-between w-full">
                <div className="flex items-center gap-3 flex-col lg:flex-row lg:ml-5 text-center">
                    <Link to={`/`}><h1 className={`font-bold blu-gradient-text text-3xl smooth`}>Reflex</h1></Link>
                    {/* <Link className=" hover:text-gray-500" to={`/`}>Home</Link>
                    <Link className=" hover:text-gray-500" to={`#`}>Portfolio</Link>
                    <Link className=" hover:text-gray-500" to={`examples`}>Examples</Link> */}
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