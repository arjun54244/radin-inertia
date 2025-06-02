import CurrentAffair from "@/components/frontend/CurrentAffair";
import FrontendLayout from "@/layouts/frontend-layout";
import { useState } from "react";

interface Props {
    appurl: string;
    file: {
        english?: string;
        hindi?: string;
    };
}
export default function LanguageAffairs({ file, appurl }: Props) {
    const [accepted, setAccepted] = useState(false);

    return (
        <>
            <FrontendLayout>
                <section className="relative table w-full py-32 lg:py-40 bg-gray-50 dark:bg-slate-800">
                    <div className="container relative">
                        <div className="grid grid-cols-1 text-center mt-10">
                            <h3 className="text-3xl leading-normal font-semibold"> Current Affairs</h3>
                        </div>
                    </div>

                    <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                        <ul className="tracking-[0.5px] mb-0 inline-block">
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="index.html">Radian</a></li>
                            <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="#"></a></li>
                            <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                            <li className="inline-block uppercase text-[13px] font-bold text-orange-500" aria-current="page"> Current Affairs</li>
                        </ul>
                    </div>
                </section>

                <section className="relative md:py-24 py-16">
                    <div className="container relative">
                        <div className="md:flex justify-center">
                            <div className="md:w-3/4">
                                <div className="p-6 bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                                    <h5 className="text-xl font-semibold mb-4"> Current Affairs</h5>

                                    {/* PDF Viewer */}
                                    <div className="relative border border-slate-200 dark:border-slate-700 rounded overflow-hidden shadow mb-6">
                                        {!accepted && (
                                            <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 z-10 flex items-center justify-center text-sm text-gray-500 font-semibold pointer-events-none">
                                                Viewing only – Download disabled
                                            </div>
                                        )}
                                        <iframe
                                            src={`/storage/${file.english || file.hindi}#toolbar=0&navpanes=0`}
                                            title="PDF Viewer"
                                            frameBorder="0"
                                            className={`w-full h-[800px] rounded-xl shadow-md ${!accepted ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
                                            style={{ border: "none" }}
                                        ></iframe>

                                    </div>

                                    <div className="mt-6">
                                        <button
                                            onClick={() => setAccepted(true)}
                                            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white rounded-md"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => setAccepted(false)}
                                            className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-orange-500 border-orange-500 text-orange-500 hover:text-white rounded-md ms-2"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </FrontendLayout>
        </>
    );
}


