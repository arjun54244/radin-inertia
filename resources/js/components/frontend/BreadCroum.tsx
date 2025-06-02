import { Link } from "@inertiajs/react";

interface BreadcrumbItem {
    label: string;
    url?: string;
    active?: boolean;
}

interface BreadCroumProps {
    title: string;
    items: BreadcrumbItem[];
}

const BreadCroumLight = ({ title, items }: BreadCroumProps) => {
    return (
        <section className="relative table w-full py-32 lg:py-40 bg-gray-50 dark:bg-slate-800">
            <div className="container relative">
                <div className="grid grid-cols-1 text-center mt-10">
                    <h3 className="text-3xl leading-normal font-semibold">{title}</h3>
                </div>
            </div>

            <div className="absolute text-center z-10 bottom-5 start-0 end-0 mx-3">
                <ul className="tracking-[0.5px] mb-0 inline-block">
                    {items.map((item, index) => (
                        <li key={index} className="inline-block">
                            {item.url && !item.active ? (
                                <Link
                                    href={item.url}
                                    className="uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className={`uppercase text-[13px] font-bold ${
                                        item.active ? "text-orange-500" : ""
                                    }`}
                                    aria-current={item.active ? "page" : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                            {index < items.length - 1 && (
                                <span className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180">
                                    <i className="mdi mdi-chevron-right"></i>
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default BreadCroumLight;
