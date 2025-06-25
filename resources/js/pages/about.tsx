
import { HandCoinsIcon, Map, Phone, TruckIcon, UserCogIcon } from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import Team from "@/components/frontend/Team";
import FrontendLayout from "@/layouts/frontend-layout";


export default function page() {
    return (

        <>
         <Head title="About" />
            <FrontendLayout>
                <section className="relative table w-full items-center py-36 bg-top bg-no-repeat bg-cover" style={{ backgroundImage: "url('assets/img/breadcrumb/1.png')" }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-400/10 via-slate-400/10 to-slate-900"></div>
                    <div className="container relative">
                        <div className="grid grid-cols-1 pb-8 text-center mt-10">
                            <h3 className="mb-3 text-4xl leading-normal tracking-wider font-semibold text-white">About Us</h3>

                            <p className="text-slate-400 text-lg max-w-xl mx-auto">Welcome to Radian Learning Pvt Ltd</p>
                        </div>
                    </div>

                    <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                        <ul className="tracking-[0.5px] mb-0 inline-block">
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><Link href="/">Radian</Link></li>
                            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">About</li>
                        </ul>
                    </div>
                </section>

                <section className="relative md:py-24 py-16">
                    <div className="container relative">
                        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
                            <div className="lg:col-span-5 md:col-span-6">
                                <img src="assets/img/about/1.png" className="rounded-t-full shadow-md dark:shadow-gray-800" alt="" />
                            </div>

                            <div className="lg:col-span-7 md:col-span-6">
                                <div className="lg:ms-8">
                                    <h6 className="text-orange-500 font-semibold uppercase text-lg">Welcome to Radian Learning Pvt Ltd</h6>
                                    <h5 className="font-semibold text-3xl leading-normal my-4">Aligning success with hard work…</h5>

                                    <p className="text-slate-400 max-w-xl">
                                        The Radian Learning Pvt Ltd is a Delhi-based firm, publishing books for school level as well as the leading
                                        competitive exams in India. The Publishing House of Radian Books is founded under the guidance of the
                                        accomplished mathematician and author, Dr. RS Aggarwal. Radian Book Company provides a comprehensive
                                        solution for all your exam-related queries. The Company provides competitive exam books with the best
                                        content in the latest exam pattern. With years of experience in curating reliable and error-free content,
                                        Radian provides a spectrum of books covering all the major competitive exams. Radian has so far published
                                        books for examinations like CBSE Boards, Jawahar Navodaya, SSC, Police, Railways, and many more.
                                    </p>

                                    <p className="text-slate-400 max-w-xl mt-4">
                                        Radian is progressively moving towards a hybrid model of learning by bringing together online and offline
                                        communities. The Radian books act as an all-in-one guide with explanations, practice sets, and even video
                                        lectures through the use of QR Codes for our aspirants. Our aim is to direct you to the best books that help
                                        students to prepare for their competitive exams in a limited time.
                                    </p>

                                    <p className="text-slate-400 max-w-xl mt-4">
                                        Radian’s agenda is to cater to the farthest corners of India by providing premium content at the most
                                        affordable prices. Radian envisions a successful youth that has accessibility to quality content.
                                    </p>
                                    <div className="flex ">
                                        <div className="flex items-center mt-6">
                                            <Phone className="w-6 h-6 me-4" />
                                            <div>
                                                <h5 className="title font-bold mb-0">Phone</h5>
                                                <a href="tel:+919811341569" className="tracking-wide text-orange-500">+91 9811341569</a>
                                            </div>
                                        </div>

                                        <div className="flex items-center mt-6 ms-8">
                                            <Map className="w-6 h-6 me-4" />
                                            <div>
                                                <h5 className="title font-bold mb-0">Location</h5>
                                                <a href="https://www.google.com/maps/place/Radian+Book+Company/@28.696024,77.130314,16z/data=!4m6!3m5!1s0x390d03cae60c2f17:0x7d73e5d67ec58074!8m2!3d28.6960242!4d77.1303144!16s%2Fg%2F11h4zj2mhq?hl=en&entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D" className="tracking-wide text-orange-500">View on Google Map</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-12 md:col-span-12 mt-16">
                                <div className="lg:ms-8 text-center">
                                    <h6 className="text-orange-500 font-semibold uppercase text-lg">Our Vision</h6>
                                    <h5 className="font-semibold text-3xl leading-normal my-4">Empowering Education for Everyone</h5>
                                    <p className="text-slate-400 max-w-3xl  text-left">Currently, Radian Learning has a modest 20-member team and going by the response it is getting from industry players and learners, is well on its way to becoming the ed-tech giant it deserves to be. The primary credit for this goes to everyone in the team, who live, eat, drink, and breathe the company’s mission and vision.</p>
                                    <p className="text-slate-400 max-w-3xl  mt-4 text-left">Radian Learning shall work towards enabling low-cost quality education in every corner of India by leveraging technology to reach learners, irrespective of their location.</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="container relative md:mt-24 mt-16">
                        <div className="grid grid-cols-1 justify-center text-center mb-4">
                            <h6 className="text-orange-500 font-semibold uppercase text-lg">Our Promise</h6>
                            <h5 className="font-semibold text-3xl leading-normal my-4">We Designed and <br /> Developed Products</h5>
                        </div>

                        <div className="grid md:grid-cols-3 grid-cols-1 mt-6 gap-6">

                            <div className="p-6 shadow-sm hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-md bg-white dark:bg-slate-900">
                                <TruckIcon size={35} className="mdi mdi-truck-check-outline text-4xl text-orange-500" />
                                <div className="content mt-6">
                                    <a href="#" className="title h5 text-xl font-medium hover:text-orange-500">Free Shipping</a>
                                    <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                    <div className="mt-4">
                                        <a href="#" className="text-orange-500">Read More <i className="mdi mdi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>



                            <div className="p-6 shadow-sm hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-md bg-white dark:bg-slate-900">
                                <UserCogIcon size={35} className="mdi mdi-account-wrench-outline text-4xl text-orange-500" />
                                <div className="content mt-6">
                                    <a href="#" className="title h5 text-xl font-medium hover:text-orange-500">24/7 Support</a>
                                    <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                    <div className="mt-4">
                                        <a href="#" className="text-orange-500">Read More <i className="mdi mdi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>



                            <div className="p-6 shadow-sm hover:shadow-md dark:shadow-gray-800 dark:hover:shadow-gray-700 duration-500 rounded-md bg-white dark:bg-slate-900">
                                <HandCoinsIcon size={35} className="mdi mdi-cash-multiple text-4xl text-orange-500" />
                                <div className="content mt-6">
                                    <a href="#" className="title h5 text-xl font-medium hover:text-orange-500">Payment Process</a>
                                    <p className="text-slate-400 mt-3">The phrasal sequence of the is now so that many campaign and benefit</p>

                                    <div className="mt-4">
                                        <a href="#" className="text-orange-500">Read More <i className="mdi mdi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Team />
                </section>
            </FrontendLayout>
        </>
    )
}
