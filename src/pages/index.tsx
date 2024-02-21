import heroImage from "@/assets/img/hero-image.jpeg"
import underline from "@/assets/svg/underline.svg"
import Navbar from "@/components/global/navigation/navbar"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function index() {
    const heroText = [`Decentralized`, `Accounted`, `Innovative `, `Streamlined`, `Secured`]

    return <main className="bg-white min-h-screen">
        <Navbar isInDashboard={false} />
        <div className="px-3 lg:px-0 max-w-6xl mx-auto">

            {/* HERO */}
            <section className="mt-5 grid grid-cols-2 justify-evenly items-center">
                <div>
                    <h1 className="text-6xl text-gray-700">Make<br /> Your<br /> Business</h1>
                    <Swiper
                        className="mySwiper h-32"
                        direction={'vertical'}
                        loop={true}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}>
                        {heroText.map((txt: string) =>
                            <SwiperSlide key={txt}><h1 className="text-7xl font-bold blu-gradient-text w-fit">
                                {txt}
                                <img className="w-auto" src={underline} alt="Underline" />
                            </h1></SwiperSlide>)}
                    </Swiper>
                    <Link to={`dashboard`}><Button variant="outline" className="text-lg blu-gradient-text">Go to Dashboard</Button></Link>
                </div>
                <div className="">
                    <img className="w-11/12 bg-cover rounded-md mx-auto shadow-lg shadow-sky-200" src={heroImage} alt="Laptop" />
                </div>
            </section>

        </div>
    </main>
}