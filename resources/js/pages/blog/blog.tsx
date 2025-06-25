import FrontendLayout from "@/layouts/frontend-layout"
import { Link, router } from "@inertiajs/react";
import { CalendarDays } from "lucide-react";

interface BlogType {
    id: number;
    title: string;
    short_description: string;
    image: string;
    description: string;
    slug: string;
    meta_title: string;
    meta_desc: string;
    canonical_tag: string;
    tags: string[];
    created_at: Date;
}
interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}
interface BlogPropType {
    blogs: {
        data: BlogType[];
        links: PaginationLink[];
    };
}

function Pagination({ links }: { links: any[] }) {
    return (
        <div className="grid md:grid-cols-12 grid-cols-1 mt-8">
            <div className="md:col-span-12 text-center">
                <nav aria-label="Pagination Navigation">
                    <ul className="inline-flex items-center justify-center rounded-full border border-gray-300 overflow-hidden">
                        {links.map((link, index) => {
                            const isActive = link.active;
                            const isDisabled = link.url === null;
                            const label = link.label.replace(/&laquo;|&raquo;/g, '').trim(); // Remove « »
                            const isArrow = /&laquo;|&raquo;/.test(link.label);

                            let buttonClasses = `
                                w-18 h-10 
                                flex items-center justify-center 
                                text-sm font-medium
                                transition-colors duration-200
                                ${isActive
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-white text-gray-500 hover:bg-orange-500 hover:text-white'}
                                ${isDisabled ? 'cursor-not-allowed text-gray-300 bg-gray-100' : ''}
                            `;

                            return (
                                <li key={index}>
                                    <button
                                        disabled={isDisabled}
                                        onClick={() => link.url && router.visit(link.url)}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={buttonClasses}
                                        aria-current={isActive ? 'page' : undefined}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}


const Blog = ({ blogs }: BlogPropType) => {
    return (
        <>
            <FrontendLayout>
                <section className="relative table w-full items-center py-36 bg-[url('assets/img/breadcrumb/1.png')] bg-top bg-no-repeat bg-cover">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-200/80 to-slate-900"></div>
                    <div className="container relative">
                        <div className="grid grid-cols-1 pb-8 text-center mt-10">
                            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">Blogs</h3>
                        </div>
                    </div>

                    <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                        <ul className="tracking-[0.5px] mb-0 inline-block">
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><a href="/">Home</a></li>
                            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">Blogs</li>
                        </ul>
                    </div>
                </section>



                <section className="relative md:py-24 py-16">
                    <div className="container relative">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                            {blogs.data.map((blog) => (
                                <div key={blog.id} className="group relative overflow-hidden">
                                    <div className="relative overflow-hidden rounded-md shadow-sm dark:shadow-gray-800">
                                        <img
                                            src={`storage/${blog.image}`}
                                            className="group-hover:scale-110 duration-500"
                                            alt={blog.title}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex mb-4">
                                            <span className="flex items-center text-slate-400 text-sm">
                                                <CalendarDays className="size-4 text-slate-900 dark:text-white me-1.5" />
                                                {new Date(blog.created_at).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                        </div>

                                        <Link
                                            href={`/blogs/${blog.slug}`}
                                            className="title text-lg font-semibold hover:text-orange-500 duration-500 ease-in-out"
                                        >
                                            {blog.title}
                                        </Link>
                                        <p className="text-slate-400 mt-2">{blog.short_description}</p>

                                        <div className="mt-3">
                                            <span className="text-slate-400">
                                                by{" "}
                                                <Link
                                                    href="#"
                                                    className="text-slate-900 dark:text-white hover:text-orange-500 dark:hover:text-orange-500 font-medium"
                                                >
                                                    Radian
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>


                        <Pagination links={blogs.links} />
                    </div>
                </section>
            </FrontendLayout>
        </>
    )
}

export default Blog