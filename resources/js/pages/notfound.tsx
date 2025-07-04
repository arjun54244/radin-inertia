import FrontendLayout from "@/layouts/frontend-layout"
import { Head, Link } from "@inertiajs/react"

const notfound = () => {
    return (
        <>
            <FrontendLayout>
                <Head title="Not Found" />
                <section className="relative bg-orange-500/5">
                    <div className="container-fluid relative">
                        <div className="grid grid-cols-1">
                            <div className="flex flex-col min-h-screen justify-center md:px-10 py-10 px-4">
                                <div className="text-center">
                                    <Link href="index.html">
                                        <img src="assets/images/logo-dark.png" className="mx-auto block dark:hidden" alt="" />
                                        <img src="assets/images/logo-light.png" className="mx-auto hidden dark:block" alt="" />
                                    </Link>
                                </div>
                                <div className="title-heading text-center my-auto">
                                    <img src="assets/images/error.svg" className="mx-auto w-72" alt="" />
                                    <h1 className="mt-8 mb-6 md:text-5xl text-3xl font-bold">Page Not Found?</h1>
                                    <p className="text-slate-400">Whoops, this is embarassing. <br /> Looks like the page you were looking for wasn't found.</p>

                                    <div className="mt-4">
                                        <Link href="/" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white rounded-md">Back to Home</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </FrontendLayout>
        </>
    )
}

export default notfound