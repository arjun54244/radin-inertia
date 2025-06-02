import { categoriesShopByCategories, categoriesShopByState } from "@/components/homedata"
import {Link} from "@inertiajs/react"

export function Brands({ title, brands }: { title: string, brands: string[] }) {
    return (
        <div className="mt-4">
            <h5 className="font-medium">{title}:</h5>
            <ul className="list-none mt-2">
                {brands.map((brand) => (
                    <li key={brand}><Link href="#" className="text-slate-800 dark:text-gray-100"><i className="mdi mdi-shopping-outline text-orange-500 me-2"></i>{brand}</Link></li>
                ))}
            </ul>
        </div>
    )
}

export default function Sidebar() {
    return (
        <div className="hidden md:block lg:col-span-3 md:col-span-4">
            <div className="rounded shadow-sm dark:shadow-gray-800 p-4 sticky top-20">
                <h5 className="text-xl font-medium">Shopping Options</h5>

                <form className="mt-4">
                    <div>
                        <label htmlFor="searchname" className="font-medium">Search:</label>
                        <div className="relative mt-2">
                            <i data-feather="search" className="absolute size-4 top-[9px] end-4"></i>
                            <input type="text" className="h-9 pe-10 rounded px-3 bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 focus:ring-0 outline-none" name="s" id="searchItem" placeholder="Search..." />
                        </div>
                    </div>
                </form>


                <Brands title="Book Category" brands={categoriesShopByCategories}/>
                <Brands title="State Category" brands={categoriesShopByState}/>
            </div>
        </div>
    )
}
