import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Pencil, MapPin, Phone, Plus, Trash2 } from "lucide-react";
import AccountLayout from "./account-layout";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Address {
    id: number;
    address_line1: string;
    address_line2?: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone: string;
}

export default function Billing() {
    const { auth, addresses } = usePage().props as any;
    const [activeAddress, setActiveAddress] = useState<Address | null>(null);
    const [showDialog, setShowDialog] = useState(false);

    const { data, setData, post, processing, delete: destroy } = useForm({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        phone: "",
    });

    const handleEdit = (address: Address) => {
        setData({
            address_line1: address.address_line1,
            address_line2: address.address_line2 ?? "",
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
            country: address.country,
            phone: address.phone,
        });
        setActiveAddress(address);
        setShowDialog(true);
    };
    const handleDelete = (id: number) => {
        if (!confirm("Are you sure you want to delete this address?")) return;

        destroy(route('addresses.delete', id), {
            preserveScroll: true,
            onSuccess: () => {
                if (activeAddress?.id === id) setActiveAddress(null);
            },
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/account/addresses/${activeAddress?.id ?? 'new'}`, {
            preserveScroll: true,
            onSuccess: () => setShowDialog(false),
        });
    };

    return (
        <AccountLayout>
            <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-6 md:mt-0">
                <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800 bg-white dark:bg-slate-900">
                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                        <div className="flex justify-between items-center">
                            <h6 className="text-slate-400 mb-0">
                                The following addresses will be used on the checkout page by default.
                            </h6>
                            <DialogTrigger asChild>
                                <Button
                                    onClick={() => {
                                        setActiveAddress(null);
                                        setData({
                                            address_line1: "",
                                            address_line2: "",
                                            city: "",
                                            state: "",
                                            zip_code: "",
                                            country: "",
                                            phone: "",
                                        });
                                    }}
                                    size="sm"
                                    variant="outline"
                                    className="gap-1"
                                >
                                    <Plus size={16} /> Add Address
                                </Button>
                            </DialogTrigger>
                        </div>

                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 mt-6">
                            {addresses.map((address: Address) => (
                                <div key={address.id}>
                                    <div className="flex items-center mb-4 justify-between">
                                        <h5 className="text-xl font-medium">Billing Address:</h5>
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleEdit(address)}
                                            >
                                                <Pencil className="w-4 h-4 text-orange-500" />
                                            </Button>
                                            <Button size="icon" variant="ghost" onClick={() => handleDelete(address.id)}>
                                                <Trash2 className="w-4 h-4 text-red-500" />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <p className="text-lg font-medium mb-2">{auth.user.name}</p>
                                        <ul className="list-none">
                                            <li className="flex">
                                                <MapPin className="size-4 me-2 mt-1" />
                                                <p className="text-slate-400">
                                                    {address.address_line1}, {address.address_line2}<br />
                                                    {address.city}, {address.state} - {address.zip_code}<br />
                                                    {address.country}
                                                </p>
                                            </li>
                                            <li className="flex mt-1">
                                                <Phone className="size-4 me-2 mt-1" />
                                                <p className="text-slate-400">{address.phone}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <DialogContent>
                            <DialogHeader>
                                {activeAddress ? "Edit Address" : "Add New Address"}
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="grid gap-4 mt-4">
                                <input
                                    type="text"
                                    value={data.address_line1}
                                    onChange={e => setData("address_line1", e.target.value)}
                                    placeholder="Address Line 1"
                                    className="border px-3 py-2 rounded-md"
                                    required
                                />
                                <input
                                    type="text"
                                    value={data.address_line2}
                                    onChange={e => setData("address_line2", e.target.value)}
                                    placeholder="Address Line 2"
                                    className="border px-3 py-2 rounded-md"
                                />
                                <input
                                    type="text"
                                    value={data.city}
                                    onChange={e => setData("city", e.target.value)}
                                    placeholder="City"
                                    className="border px-3 py-2 rounded-md"
                                    required
                                />
                                <input
                                    type="text"
                                    value={data.state}
                                    onChange={e => setData("state", e.target.value)}
                                    placeholder="State"
                                    className="border px-3 py-2 rounded-md"
                                    required
                                />
                                <input
                                    type="text"
                                    value={data.zip_code}
                                    onChange={e => setData("zip_code", e.target.value)}
                                    placeholder="ZIP Code"
                                    className="border px-3 py-2 rounded-md"
                                    required
                                />
                                <input
                                    type="text"
                                    value={data.country}
                                    onChange={e => setData("country", e.target.value)}
                                    placeholder="Country"
                                    className="border px-3 py-2 rounded-md"
                                    required
                                />
                                <input
                                    type="number"
                                    max={10}
                                    min={10}
                                    value={data.phone}
                                    onChange={e => setData("phone", e.target.value)}
                                    placeholder="Phone Number"
                                    className="border px-3 py-2 rounded-md"
                                    required
                                />
                                <Button type="submit" disabled={processing}>
                                    {activeAddress ? "Update Address" : "Add Address"}
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AccountLayout>
    );
}
