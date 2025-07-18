import FrontendLayout from '@/layouts/frontend-layout';
import { SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Airplay, Edit, LogOut, Settings } from 'lucide-react';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: AppLayoutProps) => (
    <>
        <FrontendLayout>
            <Head title="Profile settings" />
            <div className="relative py-4"></div>
            <section className="relative lg:pb-24 pb-16 md:mt-[84px] mt-[70px]">
                <div className="container relative">
                    <div className="relative overflow-hidden md:rounded-md shadow-sm dark:shadow-gray-700 h-42 bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/assets/img/breadcrumb/1.png')" }}></div>
                </div>

                <div className="container relative md:mt-16 mt-8">
                    <div className="md:flex">
                        <Sidebar />
                        {children}
                    </div>
                </div>
            </section>
        </FrontendLayout >
    </>
);


export function Sidebar() {
        const { auth,sidebarOpen } = usePage<SharedData>().props;
        const user = auth?.user;
        console.log(sidebarOpen);
    return (
        <div className="lg:w-1/4 md:w-1/3 md:px-3">
            <div className="relative md:-mt-48 -mt-32">
                <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800 bg-white dark:bg-slate-900">
                    <div className="profile-pic text-center mb-5">
                        <input id="pro-img" name="profile-image" type="file" className="hidden" />
                        <div>
                            <div className="relative h-28 w-28 mx-auto">
                                <img src={user.avatar} className="rounded-full shadow-sm dark:shadow-gray-800 ring-4 ring-slate-50 dark:ring-slate-800" id="profile-image" alt="" />
                                <label className="absolute inset-0 cursor-pointer" htmlFor="pro-img"></label>
                            </div>

                            <div className="mt-4">
                                <h5 className="text-lg font-semibold">{user.name}</h5>
                                <p className="text-slate-400">{user.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700">
                        <ul className="list-none sidebar-nav mb-0 pb-0" id="navmenu-nav">
                            <li className="navbar-item account-menu">
                                <Link href="account" className="navbar-link text-slate-400 flex items-center py-2 rounded">
                                
                                    <span className="me-2 mb-0">
                                        <Airplay className="size-4" />
                                    </span>
                                    <h6 className="mb-0 font-medium">Account</h6>
                                </Link>
                            </li>

                            <li className="navbar-item account-menu">
                                <Link href="billing" className="navbar-link text-slate-400 flex items-center py-2 rounded">
                                    <span className="me-2 mb-0">
                                        <Edit className="size-4" />
                                    </span>
                                    <h6 className="mb-0 font-medium">Billing Info</h6>
                                </Link>
                            </li>

                            <li className="navbar-item account-menu">
                                <a href="setting" className="navbar-link text-slate-400 flex items-center py-2 rounded">
                                    <span className="me-2 mb-0">
                                        <Settings className="size-4" />
                                    </span>
                                    <h6 className="mb-0 font-medium">Settings</h6>
                                </a>
                            </li>

                            <li className="navbar-item account-menu">
                                <Link href="logout" className="navbar-link text-slate-400 flex items-center py-2 rounded">
                                    <span className="me-2 mb-0">
                                        <LogOut className="size-4" />
                                    </span>
                                    <h6 className="mb-0 font-medium">Sign Out</h6>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
