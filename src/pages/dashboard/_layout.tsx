import NavbarDashboard from "@/components/global/navigation/navbar-dashboard"
import Sidebar from "@/components/global/navigation/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { AppProvider } from "@/store"
import { useState } from "react"
import { Outlet } from "react-router-dom"

export default function Layout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
    function toggleSidebar() { setIsSidebarOpen(!isSidebarOpen) }

    return <AppProvider>
        <section className={`bg-slate-50/70`}>
            <NavbarDashboard isSidebarOpen={isSidebarOpen} toggleSidebarFn={toggleSidebar} isLoggedIn={true} />
            <Sidebar sidebarOpen={isSidebarOpen} />
            <article className={`min-h-[calc(100%-4rem)] ${isSidebarOpen ? "pl-64" : "pl-16"} smooth`}>
                {/* SIDEBAR */}
                {/* <NavbarDashboard isSidebarOpen={isSidebarOpen} toggleSidebarFn={toggleSidebar} isLoggedIn={true} /> */}

                {/* OUTLET */}
                <div className={`w-full h-full`}>
                    <Outlet />
                </div>
            </article>
        </section>
        <Toaster />
    </AppProvider>
}