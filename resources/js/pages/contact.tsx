import FrontendLayout from "@/layouts/frontend-layout";
import { Head, useForm, usePage } from '@inertiajs/react';
import { toast } from 'react-toastify';
import { Mail, Map, Phone } from "lucide-react";
import { useEffect } from "react";

export default function Contact() {
    const page = usePage();
    const flash = (page.props as any).flash as { success?: string };
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        comments: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('contact.store'), {
            onSuccess: () => {
                toast.success('Message sent successfully!');
                reset();
            },
        });
    };
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash]);
    return (
        <>
            <FrontendLayout>
                <Head title="Contact Us" />
                <div className="relative py-4"></div>
               
                <section className="relative lg:py-24 py-16">
                    <div className="container">
                        <div className="grid md:grid-cols-12 grid-cols-1 items-center gap-6">
                            <div className="lg:col-span-7 md:col-span-6">
                                <img src="assets/img/contact/1.png" alt="" />
                            </div>

                            <div className="lg:col-span-5 md:col-span-6">
                                <div className="lg:ms-5">
                                    <div className="bg-white dark:bg-slate-900 rounded-md shadow-sm dark:shadow-gray-700 p-6">
                                        <h3 className="mb-6 text-2xl leading-normal font-semibold">Get in touch !</h3>

                                        <form onSubmit={handleSubmit}>
                                            <div className="grid lg:grid-cols-12 grid-cols-1 gap-3">
                                                <div className="lg:col-span-12">
                                                    <label htmlFor="name" className="font-semibold">Your Name:</label>
                                                    <input
                                                        id="name"
                                                        value={data.name}
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                        placeholder="Name"
                                                    />
                                                    {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
                                                </div>

                                                <div className="lg:col-span-6">
                                                    <label htmlFor="email" className="font-semibold">Your Email:</label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                        placeholder="Email"
                                                    />
                                                    {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
                                                </div>

                                                <div className="lg:col-span-6">
                                                    <label htmlFor="phone" className="font-semibold">Your Phone no.:</label>
                                                    <input
                                                        id="phone"
                                                        type="tel"
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                        className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                        placeholder="phone"
                                                    />
                                                    {errors.phone && <div className="text-red-500 text-sm">{errors.phone}</div>}
                                                </div>

                                                <div className="lg:col-span-12">
                                                    <label htmlFor="subject" className="font-semibold">Your Question:</label>
                                                    <input
                                                        id="subject"
                                                        value={data.subject}
                                                        onChange={(e) => setData('subject', e.target.value)}
                                                        className="mt-2 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                        placeholder="Subject"
                                                    />
                                                </div>

                                                <div className="lg:col-span-12">
                                                    <label htmlFor="comments" className="font-semibold">Your Comment:</label>
                                                    <textarea
                                                        id="comments"
                                                        value={data.comments}
                                                        onChange={(e) => setData('comments', e.target.value)}
                                                        className="mt-2 w-full py-2 px-3 h-28 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0"
                                                        placeholder="Message"
                                                    />
                                                    {errors.comments && <div className="text-red-500 text-sm">{errors.comments}</div>}
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md mt-2"
                                            >
                                                {processing ? 'Sending...' : 'Send Message'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container lg:mt-24 mt-16">
                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
                            <div className="text-center px-6">
                                <div className="relative text-transparent">
                                    <div className="size-20 bg-orange-500/5 text-orange-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                                        <Phone />
                                    </div>
                                </div>

                                <div className="content mt-7">
                                    <h5 className="title h5 text-lg font-semibold">Phone</h5>
                                    <p className="text-slate-400 mt-3">Get in touch with us for any inquiries related to our books and services.</p>

                                    <div className="mt-5">
                                        <a href="tel:+919811341569" className="text-orange-500 font-medium">(+91) 9811341569</a>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center px-6">
                                <div className="relative text-transparent">
                                    <div className="size-20 bg-orange-500/5 text-orange-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                                        <Mail />
                                    </div>
                                </div>

                                <div className="content mt-7">
                                    <h5 className="title h5 text-lg font-semibold">Email</h5>
                                    <p className="text-slate-400 mt-3">For orders, support, or collaboration, reach out to us via email.</p>

                                    <div className="mt-5">
                                        <a href="mailto:info@radianbooks.in" className="text-orange-500 font-medium">info@radianbooks.in</a>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center px-6">
                                <div className="relative text-transparent">
                                    <div className="size-20 bg-orange-500/5 text-orange-500 rounded-xl text-2xl flex align-middle justify-center items-center mx-auto shadow-sm dark:shadow-gray-800">
                                        <Map />
                                    </div>
                                </div>

                                <div className="content mt-7">
                                    <h5 className="title h5 text-lg font-semibold">Location</h5>
                                    <p className="text-slate-400 mt-3">Visit our office at Radian Book Company, your trusted source for competitive exam books.</p>

                                    <div className="mt-5">
                                        <a href="https://www.google.com/maps/place/Radian+Book+Company/@28.696024,77.130314,16z/data=!4m6!3m5!1s0x390d03cae60c2f17:0x7d73e5d67ec58074!8m2!3d28.6960242!4d77.1303144!16s%2Fg%2F11h4zj2mhq?hl=en&entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D"
                                            data-type="iframe" className="video-play-icon read-more lightbox text-orange-500 font-medium">View on Google map</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                 <div className="container-fluid relative mt-5">
                    <div className="grid grid-cols-1">
                        <div className="w-full leading-[0] border-0">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6999.573569838497!2d77.13031400000001!3d28.696023999999998!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03cae60c2f17%3A0x7d73e5d67ec58074!2sRadian%20Book%20Company!5e0!3m2!1sen!2sin!4v1741329443686!5m2!1sen!2sin" style={{ border: 0 }} className="w-full h-[500px]" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            </FrontendLayout>
        </>
    )
}
