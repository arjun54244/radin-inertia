import { useCart } from '@/hooks/useCart';
import FrontendLayout from '@/layouts/frontend-layout';
import { SharedData } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type FormData = {
    offer_code: string;
    payment_method: string;
    address_id: number | null;
    items: {
        product_id: number;
        quantity: number;
        price: number;
    }[];
};
interface Address {
    id: number;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    phone: string;
}

interface CheckoutProps extends SharedData {
    addresses: Address[];
    billingData?: Partial<Address>;
}

export default function Checkout({ billingData }: CheckoutProps) {
    const page = usePage();
    const flash = (page.props as any).flash as { success?: string };
    const { data } = useCart();
    const cartItems = data?.cartItems ?? [];
    const totalPrice = data?.totalPrice ?? 0;
    const { auth, addresses } = usePage<CheckoutProps>().props;
    const user = auth.user;

    const [offerCode, setOfferCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountedTotal, setDiscountedTotal] = useState(totalPrice);
    const [localAddress, setLocalAddress] = useState({
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
        phone: '',
    });

    useEffect(() => {
        const discounted = totalPrice - (totalPrice * discount) / 100;
        setDiscountedTotal(Math.round(discounted));
    }, [discount, totalPrice]);
    const form = useForm<FormData>({
        offer_code: '',
        payment_method: '',
        address_id: null,
        items: [],
    });
    useEffect(() => {
        const preparedItems = cartItems.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: Number(item.price),
        }));
        // Only update if different from current form data
        const currentItems = form.data.items;
        const isSame = JSON.stringify(preparedItems) === JSON.stringify(currentItems);

        if (!isSame) {
            form.setData('items', preparedItems);
        }
    }, [cartItems]);

    useEffect(() => {
        form.setData('offer_code', offerCode);
    }, [offerCode]);
    useEffect(() => {
        if (form.data.address_id) {
            const selected = addresses.find((a) => a.id === Number(form.data.address_id));
            if (selected) {
                setLocalAddress({
                    address_line1: selected.address_line1 || '',
                    address_line2: selected.address_line2 || '',
                    city: selected.city || '',
                    state: selected.state || '',
                    zip_code: selected.zip_code || '',
                    country: selected.country || '',
                    phone: selected.phone || '',
                });
            }
        }
    }, [form.data.address_id]);

    const handleApplyOffer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(route('offer.apply'), { code: offerCode });
            if (response.data.discount_percent) {
                setDiscount(response.data.discount_percent);
                toast.success(`Offer applied! ${response.data.discount_percent}% discount`);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid offer code');
            setDiscount(0);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cartItems.length === 0) return toast.error('Your cart is empty.');
        if (!form.data.address_id) return toast.error('Please select a delivery address.');
        if (!form.data.payment_method) return toast.error('Please select a payment method.');

        console.log('sending data', form.data);

        try {
            const response = await axios.post('/payment', form.data);

            console.log('RESPONSE', response.data);
            if (response?.data?.redirect == 'razorpay') {
                const { key, razorpayOrder } = response.data;
                console.log('Launching Razorpay...', razorpayOrder);
                console.log('Launching Razorpay...', razorpayOrder.amount);
                const options = {
                    key: key,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    name: 'Radian Books',
                    description: 'Order Payment',
                    image: 'https://radianbooks.in/img/logo.jpg',
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phone,
                    },
                    notes: {
                        address: 'Razorpay Corporate Office',
                    },
                    handler: function (res: any) {
                        axios
                            .post(route('payment.verify'), {
                                razorpay_payment_id: res.razorpay_payment_id,
                                razorpay_order_id: res.razorpay_order_id,
                                razorpay_signature: res.razorpay_signature,
                            })
                            .then(() => (window.location.href = route('thankyou')))
                            .catch(() => toast.error('Payment verification failed.'));
                    },
                    theme: { color: '#f97316' },
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            } else {
                console.log('COD SUCCESS', response.data);
                
                toast.success('Order placed successfully (COD)');
                // window.location.href = route('thankyou');
                router.visit(route('thankyou'));
            }
        } catch (error: any) {
            console.error('Checkout error:', error.response?.data?.errors || error);
            const errors = error.response?.data?.errors;
            toast.error(errors ? error : 'Order placement failed.');
        }
    };

    return (
        <>
            <Head title="Checkout" />
            <FrontendLayout>
                <section className="relative table w-full bg-gray-50 py-20 lg:py-24 dark:bg-slate-800">
                    <div className="relative container justify-center">
                        <div className="mt-14 grid grid-cols-1 justify-center">
                            <h3 className="text-3xl leading-normal font-semibold">Checkout</h3>
                        </div>

                        <div className="relative mt-3">
                            <ul className="mb-0 inline-block tracking-[0.5px]">
                                <li className="inline-block text-[13px] font-bold uppercase duration-500 ease-in-out hover:text-orange-500">
                                    <a href="index.html">Radian</a>
                                </li>
                                <li className="mx-0.5 inline-block text-base text-slate-950 ltr:rotate-0 rtl:rotate-180 dark:text-white">
                                    <i className="mdi mdi-chevron-right"></i>
                                </li>
                                <li className="inline-block text-[13px] font-bold text-orange-500 uppercase" aria-current="page">
                                    Checkout
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="relative py-16 md:py-24">
                    <div className="relative container">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
                            <div className="lg:col-span-8">
                                <div className="rounded-md p-6 shadow-sm dark:shadow-gray-800">
                                    <h3 className="text-xl leading-normal font-semibold">Billing address</h3>

                                    <form onSubmit={handleSubmit}>
                                        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
                                            <div className="lg:col-span-12">
                                                <label className="form-label font-semibold">
                                                    Full Name : <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={user?.name}
                                                    className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                    placeholder="Full Name:"
                                                    id="fullname"
                                                    readOnly
                                                    name="fullname"
                                                    required
                                                />
                                            </div>

                                            <div className="lg:col-span-6">
                                                <label className="form-label font-semibold">
                                                    Your Email : <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    value={user?.email}
                                                    readOnly
                                                    className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                    placeholder="Email"
                                                    name="email"
                                                    required
                                                />
                                            </div>
                                            <div className="lg:col-span-6">
                                                <label className="form-label font-semibold">
                                                    Your Phone : <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                    placeholder="Phone:"
                                                    id="phone"
                                                    name="phone"
                                                    value={localAddress.phone}
                                                    minLength={10}
                                                    maxLength={10}
                                                    pattern="\d{10}"
                                                    onChange={(e) => setLocalAddress({ ...localAddress, phone: e.target.value })}
                                                />
                                            </div>

                                            {addresses.length > 0 && (
                                                <div className="lg:col-span-12">
                                                    <label className="form-label font-semibold">Select Saved Address:</label>
                                                    <select
                                                        className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                        onChange={(e) => form.setData('address_id', Number(e.target.value))}
                                                    >
                                                        <option value="">-- Select an address --</option>
                                                        {addresses.map((address) => (
                                                            <option key={address.id} value={address.id}>
                                                                {address.address_line1}, {address.city}, {address.state}, {address.zip_code}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}

                                            <div className="lg:col-span-12">
                                                <label className="form-label font-semibold">
                                                    Address : <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                    id="address"
                                                    value={localAddress.address_line1}
                                                    placeholder="Address Line 1"
                                                    onChange={(e) => setLocalAddress({ ...localAddress, address_line1: e.target.value })}
                                                    readOnly
                                                />
                                            </div>

                                            <div className="lg:col-span-12">
                                                <label className="form-label font-semibold">Address 2 : </label>
                                                <input
                                                    type="text"
                                                    className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                    id="address"
                                                    value={localAddress.address_line2}
                                                    onChange={(e) => setLocalAddress({ ...localAddress, address_line2: e.target.value })}
                                                    placeholder="Address Line 2"
                                                    readOnly
                                                />
                                            </div>

                                            <div className="lg:col-span-4">
                                                <label className="font-semibold">Country:</label>
                                                <input
                                                    type="text"
                                                    className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                    placeholder="Country:"
                                                    id="country"
                                                    name="country"
                                                    value={localAddress.country}
                                                    onChange={(e) => setLocalAddress({ ...localAddress, country: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="lg:col-span-4">
                                                <label className="font-semibold">State:</label>
                                                <input
                                                    type="text"
                                                    className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                    placeholder="State:"
                                                    id="state"
                                                    name="state"
                                                    value={localAddress.state}
                                                    onChange={(e) => setLocalAddress({ ...localAddress, state: e.target.value })}
                                                    required
                                                />
                                            </div>

                                            <div className="lg:col-span-4">
                                                <label className="form-label font-semibold">
                                                    Zip Code : <span className="text-red-600">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="mt-2 h-10 w-full rounded border border-gray-100 bg-transparent px-3 py-2 outline-none focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200"
                                                    placeholder="Zip:"
                                                    value={localAddress.zip_code}
                                                    onChange={(e) => setLocalAddress({ ...localAddress, zip_code: e.target.value })}
                                                    id="zip"
                                                    name="zip"
                                                    minLength={6}
                                                    maxLength={6}
                                                    pattern="\d{6}"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <h3 className="mt-6 text-xl leading-normal font-semibold">Payment</h3>
                                        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-12">
                                            <div className="lg:col-span-12">
                                                <div className="block">
                                                    <div>
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                type="radio"
                                                                name="payment_method"
                                                                value="online"
                                                                checked={form.data.payment_method === 'online'}
                                                                onChange={(e) => form.setData('payment_method', e.target.value)}
                                                                className="form-radio focus:ring-opacity-50 me-2 border-gray-100 text-orange-500 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-offset-0 dark:border-gray-800"
                                                            />
                                                            <span className="text-slate-400">Online</span>
                                                        </label>
                                                    </div>
                                                </div>

                                                <div className="mt-2 block">
                                                    <div>
                                                        <label className="inline-flex items-center">
                                                            <input
                                                                className="form-radio focus:ring-opacity-50 me-2 border-gray-100 text-orange-500 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-offset-0 dark:border-gray-800"
                                                                type="radio"
                                                                name="payment_method"
                                                                value="cod"
                                                                checked={form.data.payment_method === 'cod'}
                                                                onChange={(e) => form.setData('payment_method', e.target.value)}
                                                            />
                                                            <span className="text-slate-400">Cash on Delivery</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="submit"
                                                className="inline-block w-full rounded-md bg-orange-500 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500"
                                                disabled={form.processing}
                                            >
                                                {form.processing ? 'Processing...' : 'Place Order'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="lg:col-span-4">
                                <div className="rounded-md p-6 shadow-sm dark:shadow-gray-800">
                                    <div className="flex items-center justify-between">
                                        <h5 className="text-lg font-semibold">Your Cart</h5>

                                        <a
                                            href="javascript:void(0)"
                                            className="flex h-5 items-center justify-center rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-bold text-white"
                                        >
                                            {cartItems.length}
                                        </a>
                                    </div>

                                    <div className="mt-4 rounded-md shadow-sm dark:shadow-gray-800">
                                        {cartItems.length === 0 ? (
                                            <p className="text-center text-slate-400">Your cart is empty.</p>
                                        ) : (
                                            cartItems.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between border border-gray-100 p-3 dark:border-gray-800"
                                                >
                                                    <div>
                                                        <h6 className="font-semibold">{item.name?.slice(0, 50)}...</h6>
                                                        <p className="text-sm text-slate-400">Quantity: {item.quantity}</p>
                                                    </div>

                                                    <p className="font-semibold text-slate-400">₹{item.price}</p>
                                                </div>
                                            ))
                                        )}
                                        <div className="flex items-center justify-between border border-gray-100 p-3 dark:border-gray-800">
                                            <div>
                                                <h5 className="font-semibold">Total (₹)</h5>
                                                {discount > 0 && <p className="text-sm font-medium text-green-600">Discount Applied: {discount}%</p>}
                                            </div>

                                            <p className="font-semibold"> ₹ {discount > 0 ? discountedTotal : totalPrice}</p>
                                        </div>
                                    </div>

                                    <div className="subcribe-form mt-6">
                                        <form className="relative max-w-xl" onSubmit={handleApplyOffer}>
                                            <input
                                                type="text"
                                                id="offer"
                                                name="offer"
                                                value={offerCode}
                                                onChange={(e) => setOfferCode(e.target.value)}
                                                className="h-[50px] w-full rounded-full bg-white py-4 ps-6 pe-40 text-slate-900 shadow-sm outline-none dark:bg-slate-900 dark:text-white dark:shadow-gray-800"
                                                placeholder="Promo code"
                                            />
                                            <button
                                                type="submit"
                                                className="absolute end-[3px] top-[2px] inline-block h-[46px] rounded-full bg-orange-500 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500"
                                            >
                                                Redeem
                                            </button>
                                        </form>
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
