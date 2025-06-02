import BreadCroumLight from "@/components/frontend/BreadCroum";
import FrontendLayout from "@/layouts/frontend-layout";

export default function RefundReturnsPage() {

    return (
        <>
            <FrontendLayout>
                <BreadCroumLight title="Terms Of Services" items={[{ label: "Home", url: "/" }, { label: "Terms Of Service" }]} />

                <section className="relative md:py-24 py-16">
                    <div className="container relative">
                        <div className="md:flex justify-center">
                            <div className="md:w-3/4">
                                <div className="p-6 bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                                    <h5 className="text-xl font-semibold mb-4">Introduction :</h5>
                                    <p className="text-slate-400">It seems that only fragments of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>

                                    <h5 className="text-xl font-semibold mb-4 mt-8">User Agreements :</h5>
                                    <p className="text-slate-400">The most well-known dummy text is the 'Lorem Ipsum', which is said to have <b className="text-red-600">originated</b> in the 16th century. Lorem Ipsum is <b className="text-red-600">composed</b> in a pseudo-Latin language which more or less <b className="text-red-600">corresponds</b> to 'proper' Latin. It contains a series of real Latin words. This ancient dummy text is also <b className="text-red-600">incomprehensible</b>, but it imitates the rhythm of most European languages in Latin script. The <b className="text-red-600">advantage</b> of its Latin origin and the relative <b className="text-red-600">meaninglessness</b> of Lorum Ipsum is that the text does not attract attention to itself or distract the viewer's <b className="text-red-600">attention</b> from the layout.</p>
                                    <p className="text-slate-400 mt-3">There is now an <b className="text-red-600">abundance</b> of readable dummy texts. These are usually used when a text is <b className="text-red-600">required purely</b> to fill a space. These alternatives to the classic Lorem Ipsum texts are often amusing and tell short, funny or <b className="text-red-600">nonsensical</b> stories.</p>
                                    <p className="text-slate-400 mt-3">It seems that only <b className="text-red-600">fragments</b> of the original text remain in the Lorem Ipsum texts used today. One may speculate that over the course of time certain letters were added or deleted at various positions within the text.</p>

                                    <h5 className="text-xl font-semibold mb-4 mt-8">Restrictions :</h5>
                                    <p className="text-slate-400">You are specifically restricted from all of the following :</p>
                                    <ul className="list-none text-slate-400 mt-3">
                                        <li className="flex mt-2"><i className="mdi mdi-chevron-right text-orange-500 text-lg align-middle me-2"></i>Digital Marketing Solutions for Tomorrow</li>
                                        <li className="flex mt-2"><i className="mdi mdi-chevron-right text-orange-500 text-lg align-middle me-2"></i>Our Talented & Experienced Marketing Agency</li>
                                        <li className="flex mt-2"><i className="mdi mdi-chevron-right text-orange-500 text-lg align-middle me-2"></i>Create your own skin to match your brand</li>
                                        <li className="flex mt-2"><i className="mdi mdi-chevron-right text-orange-500 text-lg align-middle me-2"></i>Digital Marketing Solutions for Tomorrow</li>
                                        <li className="flex mt-2"><i className="mdi mdi-chevron-right text-orange-500 text-lg align-middle me-2"></i>Our Talented & Experienced Marketing Agency</li>
                                        <li className="flex mt-2"><i className="mdi mdi-chevron-right text-orange-500 text-lg align-middle me-2"></i>Create your own skin to match your brand</li>
                                    </ul>

                                    <h5 className="text-xl font-semibold mt-8">Users Question & Answer :</h5>

                                    <div id="accordion-collapse" data-accordion="collapse" className="mt-6">
                                        <div className="relative shadow-sm dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
                                            <h2 className="text-base font-semibold" id="accordion-collapse-heading-1">
                                                <button type="button" className="flex justify-between items-center p-5 w-full font-medium text-start" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                                    <span>How does it work ?</span>
                                                    <svg data-accordion-icon className="size-4 rotate-180 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                                                <div className="p-5">
                                                    <p className="text-slate-400 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative shadow-sm dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
                                            <h2 className="text-base font-semibold" id="accordion-collapse-heading-2">
                                                <button type="button" className="flex justify-between items-center p-5 w-full font-medium text-start" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                                                    <span>Do I need a designer to use Cartzio ?</span>
                                                    <svg data-accordion-icon className="size-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
                                                <div className="p-5">
                                                    <p className="text-slate-400 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative shadow-sm dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
                                            <h2 className="text-base font-semibold" id="accordion-collapse-heading-3">
                                                <button type="button" className="flex justify-between items-center p-5 w-full font-medium text-start" data-accordion-target="#accordion-collapse-body-3" aria-expanded="false" aria-controls="accordion-collapse-body-3">
                                                    <span>What do I need to do to start selling ?</span>
                                                    <svg data-accordion-icon className="size-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div id="accordion-collapse-body-3" className="hidden" aria-labelledby="accordion-collapse-heading-3">
                                                <div className="p-5">
                                                    <p className="text-slate-400 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative shadow-sm dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
                                            <h2 className="text-base font-semibold" id="accordion-collapse-heading-4">
                                                <button type="button" className="flex justify-between items-center p-5 w-full font-medium text-start" data-accordion-target="#accordion-collapse-body-4" aria-expanded="false" aria-controls="accordion-collapse-body-4">
                                                    <span>What happens when I receive an order ?</span>
                                                    <svg data-accordion-icon className="size-4 shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                                                    </svg>
                                                </button>
                                            </h2>
                                            <div id="accordion-collapse-body-4" className="hidden" aria-labelledby="accordion-collapse-heading-4">
                                                <div className="p-5">
                                                    <p className="text-slate-400 dark:text-gray-400">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <a href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white rounded-md">Accept</a>
                                        <a href="#" className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-orange-500 border-orange-500 text-orange-500 hover:text-white rounded-md ms-2">Decline</a>
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