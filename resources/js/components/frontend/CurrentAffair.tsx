"use client";

import { FileText } from "lucide-react";
import { Link } from "@inertiajs/react";

interface CurrentAffairProps {
    title: string;
    image: string;
    link: string;
}

const CurrentAffair: React.FC<CurrentAffairProps> = ({ title, image, link }) => {
    return (
        <>
            <div className="relative overflow-hidden group">
                <Link href={link} className="text-center">
                    <img src={image} height={400} width={400} className="group-hover:scale-110 duration-500" alt={title} />
                    <span className="bg-white dark:bg-slate-900 group-hover:text-orange-500 py-2 px-6 rounded-full shadow-sm dark:shadow-gray-800 
                         absolute bottom-4 left-1/2 transform -translate-x-1/2 text-lg font-medium flex items-center gap-2">
                        <FileText className="w-5 h-5" /> {title}
                    </span>
                </Link>
            </div>
        </>
    );
};

export default CurrentAffair;
