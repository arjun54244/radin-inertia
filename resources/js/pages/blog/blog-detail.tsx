import FrontendLayout from "@/layouts/frontend-layout";
import { BlogDetailsProps } from "@/types/blog";
import { Link } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { BlogCommentSection } from '@/components/frontend/BlogComments';



const BlogDetail = ({ blog, blogs }: BlogDetailsProps) => {
    return (
        <>
            <FrontendLayout>

                <section className="relative table w-full items-center py-36 bg-[url('assets/images/hero/pages.jpg')] bg-top bg-no-repeat bg-cover">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/80 to-slate-900"></div>
                    <div className="container relative">
                        <div className="grid grid-cols-1 pb-8 text-center mt-10">
                            <h3 className="text-4xl leading-normal tracking-wider font-semibold text-white">{blog.title}</h3>

                            <ul className="list-none mt-6">
                                <li className="inline-block text-white/50 mx-5"> <span className="text-white block">Author :</span> <span className="block">Redian</span></li>
                                <li className="inline-block text-white/50 mx-5"> <span className="text-white block">Date :</span> <span className="block">{new Date(blog.created_at).toLocaleDateString()}</span></li>
                                <li className="inline-block text-white/50 mx-5"> <span className="text-white block">Time :</span> <span className="block">8 Min Read</span></li>
                            </ul>
                        </div>
                    </div>

                    <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                        <ul className="tracking-[0.5px] mb-0 inline-block">
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white/50 hover:text-white"><a href="/">Home</a></li>
                            <li className="inline-block text-base text-white/50 mx-0.5 ltr:rotate-0 rtl:rotate-180"> / </li>
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out text-white" aria-current="page">Blog Detail</li>
                        </ul>
                    </div>
                </section>



                <section className="relative md:py-24 py-16">
                    <div className="container">
                        <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                            <div className="lg:col-span-8 md:col-span-6">
                                <div className="relative overflow-hidden rounded-md shadow-sm dark:shadow-gray-800">

                                    <img src={`/storage/${blog.image}`} className="w-full group-hover:scale-110 duration-500" alt="not loding img" />

                                    <div className="p-6">
                                        <article
                                            className="prose dark:prose-invert max-w-none"
                                            dangerouslySetInnerHTML={{ __html: blog.description }}
                                        />
                                    </div>
                                </div>

                                <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800 mt-8">
                                    <h5 className="text-lg font-semibold">Leave A Comment:</h5>

                                    <form className="mt-8">
                                        <div className="grid lg:grid-cols-12 lg:gap-6">
                                            <div className="lg:col-span-6 mb-5">
                                                <div className="text-left">
                                                    <label htmlFor="name" className="font-semibold">Your Name:</label>
                                                    <input name="name" id="name" type="text" className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" placeholder="Name :" />
                                                </div>
                                            </div>

                                            <div className="lg:col-span-6 mb-5">
                                                <div className="text-left">
                                                    <label htmlFor="email" className="font-semibold">Your Email:</label>
                                                    <input name="email" id="email" type="email" className="mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0" placeholder="Email :" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1">
                                            <div className="mb-5">
                                                <div className="text-left">
                                                    <label htmlFor="comments" className="font-semibold">Your Comment:</label>
                                                    <textarea name="comments" id="comments" className="mt-3 w-full py-2 px-3 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 h-28" placeholder="Message :"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="submit" id="submit" name="send" className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md w-full">Send Message</button>
                                    </form>
                                </div>
                            </div>

                            <BlogCommentSection comments={blog.comments} />

                        </div>
                    </div>

                    <div className="container lg:mt-24 mt-16">
                        <div className="grid grid-cols-1 mb-6 text-center">
                            <h3 className="font-semibold text-3xl leading-normal">Related Blogs</h3>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6 pt-6">
                            {blogs.map((blog) => (
                                <div key={blog.id} className="group relative overflow-hidden">
                                    <div className="relative overflow-hidden rounded-md shadow-sm dark:shadow-gray-800">
                                        <img
                                            src={`/storage/${blog.image}`}
                                            className="group-hover:scale-110 duration-500"
                                            alt={blog.title}
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <div className="flex mb-4">
                                            <span className="flex items-center text-slate-400 text-sm">
                                                <i
                                                    data-feather="calendar"
                                                    className="size-4 text-slate-900 dark:text-white me-1.5"
                                                ></i>
                                                {new Date(blog.created_at).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </span>
                                            <span className="flex items-center text-slate-400 text-sm ms-3">
                                                <i
                                                    data-feather="clock"
                                                    className="size-4 text-slate-900 dark:text-white me-1.5"
                                                ></i>
                                                5 min read
                                            </span>
                                        </div>

                                        <Link
                                            href={`/blog/${blog.slug}`}
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
                    </div>
                </section>

            </FrontendLayout>
        </>
    )
}

export default BlogDetail