import { useCart } from "@/hooks/useCart";
import FrontendLayout from "@/layouts/frontend-layout";
import { SharedData } from "@/types";
import { Head, usePage, useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from 'react-toastify';


interface CheckoutProps {
    billingData?: {
        address_line1?: string;
        address_line2?: string;
        city?: string;
        state?: string;
        zip_code?: string;
        country?: string;
        phone?: string;
    };
}
export default function Checkout({ billingData }: CheckoutProps) {
    const page = usePage();
    const flash = (page.props as any).flash as { success?: string };
    const { data } = useCart();
    const cartItems = data?.cartItems ?? [];
    const totalPrice = data?.totalPrice ?? 0;
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const form = useForm({
        address: {
            address_line1: billingData?.address_line1 || '',
            address_line2: billingData?.address_line2 || '',
            city: billingData?.city || '',
            state: billingData?.state || '',
            zip_code: billingData?.zip_code || '',
            country: billingData?.country || '',
            phone: billingData?.phone || user?.phone || '',
        },
        notes: '',
        payment_method: '',
        items: cartItems.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
        })),
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (cartItems.length === 0) {
                toast.error("Your cart is empty.");
                return;
            }

            // Ensure we attach the latest items from cart before sending
            form.setData('items', cartItems.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
            })));
            const response = await axios.post(route("checkout.store"), form.data);

            if (response?.data?.redirect === 'razorpay') {
                const data = response.data.razorpay;

                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY,
                    amount: data.amount,
                    currency: data.currency,
                    name: data.name,
                    email: data.email,
                    contact: data.contact,
                    order_id: data.order_id,
                    handler: function (response: any) {
                        axios.post(route('payment.verify'), {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        }).then(() => {
                            window.location.href = route('thankyou');
                        }).catch(() => {
                            toast.error("Payment verification failed.");
                        });
                    },
                    theme: { color: "#f97316" },
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            } else {
                toast.success("Order placed successfully (COD)");
                window.location.href = route("thankyou");
            }
        } catch (error) {
            console.error(error);
            toast.error("Order placement failed.");
        }
    };
    return (
        <>
            <Head title="Checkout" />
            <FrontendLayout>
                <section className="relative table w-full py-20 lg:py-24 bg-gray-50 dark:bg-slate-800">
                    <div className="container relative justify-center">
                        <div className="grid justify-center grid-cols-1 mt-14">
                            <h3 className="text-3xl leading-normal font-semibold">Checkout</h3>
                        </div>

                        <div className="relative mt-3">
                            <ul className="tracking-[0.5px] mb-0 inline-block">
                                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500"><a href="index.html">
                                    Radian</a></li>
                                <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5 ltr:rotate-0 rtl:rotate-180"><i className="mdi mdi-chevron-right"></i></li>
                                <li className="inline-block uppercase text-[13px] font-bold text-orange-500" aria-current="page">Checkout</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="relative md:py-24 py-16">
                    <div className="container relative">
                        <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
                            <div className="lg:col-span-8">
                                <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800">
                                    <h3 className="text-xl leading-normal font-semibold">Billing address</h3>

                                    <form onSubmit={handleSubmit}>
                                        <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                                            <div className="lg:col-span-12">
                                                <label className="form-label font-semibold">Full Name : <span className="text-red-600">*</span></label>
                                                <input type="text" value={user?.name} className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2" placeholder="Full Name:" id="fullname"
                                                    readOnly name="fullname" required />
                                            </div>

                                            <div className="lg:col-span-6">
                                                <label className="form-label font-semibold">Your Phone : <span className="text-red-600">*</span></label>
                                                <input type="tel" className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2" placeholder="Phone:" id="phone" name="phone" value={form.data.address.phone}
                                                    minLength={10}
                                                    maxLength={10}
                                                    pattern="\d{10}"
                                                    onChange={(e) =>
                                                        form.setData("address", {
                                                            ...form.data.address,
                                                            phone: e.target.value,
                                                        })
                                                    } />
                                            </div>

                                            <div className="lg:col-span-6">
                                                <label className="form-label font-semibold">Your Email : <span className="text-red-600">*</span></label>
                                                <input type="email" value={user?.email} readOnly className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2" placeholder="Email" name="email" required />
                                            </div>

                                            <div className="lg:col-span-12">
                                                <label className="form-label font-semibold">Address : <span className="text-red-600">*</span></label>
                                                <input type="text" className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2" id="address" value={form.data.address.address_line1}
                                                    onChange={(e) => form.setData("address", {
                                                        ...form.data.address,
                                                        address_line1: e.target.value,
                                                    })}
                                                    placeholder="Address Line 1" required />
                                            </div>

                                            <div className="lg:col-span-12">
                                                <label className="form-label font-semibold">Address 2 : </label>
                                                <input type="text" className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2" id="address" value={form.data.address.address_line2}
                                                    onChange={(e) => form.setData("address", {
                                                        ...form.data.address,
                                                        address_line2: e.target.value,
                                                    })}
                                                    placeholder="Address Line 2" required />
                                            </div>

                                            <div className="lg:col-span-4">
                                                <label className="font-semibold">Country:</label>
                                                <input type="text" className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2" placeholder="Country:" id="country" name="country" value={form.data.address.country} onChange={(e) => form.setData("address", { ...form.data.address, country: e.target.value })} required />
                                            </div>

                                            <div className="lg:col-span-4">
                                                <label className="font-semibold">State:</label>
                                                <input type="text" className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2" placeholder="State:" id="state" name="state" value={form.data.address.state} onChange={(e) => form.setData("address", { ...form.data.address, state: e.target.value })} required />
                                            </div>

                                            <div className="lg:col-span-4">
                                                <label className="form-label font-semibold">Zip Code : <span className="text-red-600">*</span></label>
                                                <input type="text" className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 dark:border-gray-800 focus:ring-0 mt-2" placeholder="Zip:"
                                                    value={form.data.address.zip_code}
                                                    onChange={(e) => form.setData("address", {
                                                        ...form.data.address,
                                                        zip_code: e.target.value,
                                                    })} id="zip" name="zip"
                                                    minLength={6}
                                                    maxLength={6}
                                                    pattern="\d{6}"
                                                    required />
                                            </div>

                                            <div className="lg:col-span-12">
                                                <div className="flex items-center w-full mb-0">
                                                    <input className="form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-orange-600 checked:appearance-auto dark:accent-orange-600 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="sameaddress" />
                                                    <label className="form-check-label text-slate-400" htmlFor="sameaddress">Shipping address is the same as my billing address</label>
                                                </div>

                                                <div className="flex items-center w-full mb-0">
                                                    <input className="form-checkbox size-4 appearance-none rounded border border-gray-200 dark:border-gray-800 accent-orange-600 checked:appearance-auto dark:accent-orange-600 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2" type="checkbox" value="" id="savenexttime" />
                                                    <label className="form-check-label text-slate-400" htmlFor="savenexttime">Save this information for next time</label>
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-xl leading-normal font-semibold mt-6">Payment</h3>
                                        <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                                            <div className="lg:col-span-12">
                                                <div className="block">
                                                    <div>
                                                        <label className="inline-flex items-center">
                                                            <input type="radio"
                                                                name="payment_method"
                                                                value="online"
                                                                checked={form.data.payment_method == 'online'}
                                                                onChange={(e) => form.setData("payment_method", e.target.value)} className="form-radio border-gray-100 dark:border-gray-800 text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                                                            />
                                                            <span className="text-slate-400">Online</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="block mt-2">
                                                    <div>
                                                        <label className="inline-flex items-center">
                                                            <input type="radio" className="form-radio border-gray-100 dark:border-gray-800 text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2" name="payment_method"
                                                                value="cod"
                                                                checked={form.data.payment_method == 'cod'}
                                                                onChange={(e) => form.setData("payment_method", e.target.value)} />
                                                            <span className="text-slate-400">COD</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button type="submit" className="py-2 px-5 inline-block tracking-wide align-middle duration-500 text-base text-center bg-orange-500 text-white rounded-md w-full" disabled={form.processing}>
                                                {form.processing ? "Processing..." : "Place Order"}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                            </div>

                            <div className="lg:col-span-4">
                                <div className="p-6 rounded-md shadow-sm dark:shadow-gray-800">
                                    <div className="flex justify-between items-center">
                                        <h5 className="text-lg font-semibold">Your Cart</h5>

                                        <a href="javascript:void(0)" className="bg-orange-500 flex justify-center items-center text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full h-5">{cartItems.length}</a>
                                    </div>

                                    <div className="mt-4 rounded-md shadow-sm dark:shadow-gray-800">
                                        {cartItems.length === 0 ? (
                                            <p className="text-center text-slate-400">Your cart is empty.</p>
                                        ) : (
                                            cartItems.map((item, index) => (
                                                <div key={index} className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                                                    <div>
                                                        <h6 className="font-semibold">{item.name?.slice(0, 50)}...</h6>
                                                        <p className="text-sm text-slate-400">Quantity: {item.quantity}</p>
                                                    </div>

                                                    <p className="text-slate-400 font-semibold">₹{item.price}</p>
                                                </div>
                                            ))
                                        )}
                                        <div className="p-3 flex justify-between items-center border border-gray-100 dark:border-gray-800">
                                            <div>
                                                <h5 className="font-semibold">Total (₹)</h5>
                                            </div>

                                            <p className="font-semibold">₹ {totalPrice}</p>
                                        </div>
                                    </div>

                                    <div className="subcribe-form mt-6">
                                        <form className="relative max-w-xl">
                                            <input type="email" id="subcribe" name="email" className="py-4 pe-40 ps-6 w-full h-[50px] outline-none text-slate-900 dark:text-white rounded-full bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800" placeholder="Promo code" />
                                            <button type="submit" className="py-2 px-5 inline-block font-semibold tracking-wide align-middle duration-500 text-base text-center absolute top-[2px] end-[3px] h-[46px] bg-orange-500 text-white rounded-full">Redeem</button>
                                        </form>
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
