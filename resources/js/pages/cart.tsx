import { Head, Link } from "@inertiajs/react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import FrontendLayout from "@/layouts/frontend-layout";

export default function CartPage() {
  const { data, isLoading, updateQuantity, removeFromCart } = useCart();
  const cartItems = data?.cartItems || [];
  const subtotal = data?.totalPrice || 0;
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);
  const totalPrice = data?.totalPrice || 0;
  const discountedTotal = totalPrice; // If discounts are added, adjust here
  const savings = totalPrice - discountedTotal;

  return (
    <>
      <Head title="Cart" />
      <FrontendLayout>
        <div className="relative table w-full py-20 lg:py-24 md:pt-28 bg-gray-50 dark:bg-slate-800">
          <div className="container relative">
            <div className="grid grid-cols-1 mt-14">
              <h3 className="text-3xl leading-normal font-semibold">Shopping Cart</h3>
            </div>
            <div className="relative mt-3">
              <ul className="tracking-[0.5px] mb-0 inline-block">
                <li className="inline-block uppercase text-[13px] font-bold duration-500 ease-in-out hover:text-orange-500">
                  <Link href="/">Home</Link>
                </li>
                <li className="inline-block text-base text-slate-950 dark:text-white mx-0.5">
                  <i className="mdi mdi-chevron-right"></i>
                </li>
                <li className="inline-block uppercase text-[13px] font-bold text-orange-500">
                  Shopping Cart
                </li>
              </ul>
            </div>
            {savings > 0 && (
              <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                <p className="text-green-700 dark:text-green-300">
                  You're saving ₹{savings.toFixed(2)} on your order!
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-left text-xs uppercase tracking-wider text-gray-600">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={'/storage/' + item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded shadow"
                        />
                        <span className="font-medium text-gray-800">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center text-orange-500 font-semibold">
                      ₹{parseFloat(item.price).toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 border rounded text-orange-500 hover:bg-orange-100 disabled:opacity-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-1 border rounded text-orange-500 hover:bg-orange-100"
                        >
                          <Plus size={14} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product_id)}
                          className="ml-2 p-1 text-red-500 hover:bg-red-100 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="p-4 text-right font-semibold text-orange-600">
                      ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="mt-8 max-w-sm ml-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Subtotal:</span>
              <span className="text-gray-600">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Taxes:</span>
              <span className="text-gray-600">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold border-t pt-3">
              <span>Total:</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <Link
              href="/checkout"
              className="block mt-6 text-center bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded"
            >
              Checkout
            </Link>
          </div>
        </div>

      </FrontendLayout>
    </>
  );
}
