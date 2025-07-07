import FrontendLayout from "@/layouts/frontend-layout"
import { Head, Link } from "@inertiajs/react"

export default function ThankYou() {
    return (
        <>
            <Head title="thankyou" />
            <FrontendLayout>
                <div className="relative table w-full py-0 lg:py-0 md:pt-28 bg-orange-50 dark:bg-orange-800">
                </div>
                <div className="3xl:py-25 md:py-28 bg-orange-50 sm:py-13.5 py-10">
                    <div className="container">
                        <div className="row">
                            <section className="xl:w-3/4 w-full xl:pl-9 pl-3.6">
                                <div className="border border-black/10 p-7.5 rounded-xl min-h-[250px] max-sm:p-5">
                                    <div className="max-w-[420px] mx-auto">
                                        <img src="assets/img/confirmation.png" alt="" />
                                    </div>
                                    <div className="text-center mt-6">
                                        <h4 className="mb-4 capitalize">Your Order Is Completed !</h4>
                                        <p className="text-body mb-2">You will receive an order confirmation email with details of your order.</p>
                                        <p className="text-body">Order ID: 267676GHERT105467</p>
                                        <div className="mt-6 sm:flex gap-3 justify-center">
                                            <a href="account-order-details.html" className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm font-Lufga inline-block font-medium leading-[1.2] border border-secondary bg-black text-white rounded-xl duration-700 relative overflow-hidden my-1">View Order</a>
                                            <Link href='/' className="btn py-3 px-7.5 max-sm:px-6 text-base max-sm:text-sm inline-block font-medium font-Lufga leading-[1.2] border border-secondary rounded-xl duration-700 hover:bg-orange-400 hover:text-white relative overflow-hidden my-1">Back To Home</Link>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </FrontendLayout>
        </>
    )
}
