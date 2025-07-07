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
        <div style={{ margin: "24px auto" }}>
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "16px",
              fontWeight: 400,
              width: "80%",
              margin: "0 auto",
              borderRadius: "6px",
              overflow: "hidden",
              backgroundColor: "#fff",
              boxShadow: "0 0 3px rgba(60, 72, 88, 0.15)",
            }}
          >
            <thead className="w-full table-auto">
              <tr>
                <td style={{ backgroundColor: "#f8fafc", padding: 16, textAlign: "center" }}>
                  <h2 style={{ fontWeight: 600 }}>Radian Shopcart</h2>
                </td>
              </tr>
              <tr className="flex mt-1 justify-between w-full px-4">
                {/* <th className="flex-1 p-4">Item</th> */}
                <th className="flex-2 p-4">Product</th>
                <th className="flex-1 p-4">Price</th>
                <th className="flex-1 p-4">Action</th>
                <th className="flex-1 p-4">Total</th>
              </tr>
            </thead>
            <tbody>
            
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">
                    <table className="w-full   table-auto">
                      <tbody>
                        <tr className="flex items-center">
                          <td className="flex-1">
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <img
                                src={'/storage/' + item.image}
                                style={{ width: 48, borderRadius: 6, boxShadow: "0 0 3px rgba(60, 72, 88, 0.15)" }}
                                alt={item.name}
                              />
                              <span style={{ marginLeft: 8, fontWeight: 500 }}>{item.name}</span>
                            </div>
                          </td>
                          {/* show dicounded price if dicount is available */}
                          <td className="flex-1 text-center">
                            <span style={{ color: "#f97316", fontWeight: 500 }}>
                              ₹{parseFloat(item.price).toFixed(2)}
                            </span>
                            {item.price !== item.price && (
                              <span
                                style={{
                                  marginLeft: 8,
                                  textDecoration: "line-through",
                                  color: "#94a3b8",
                                }}
                              >
                                ₹{parseFloat(item.price).toFixed(2)}
                              </span>
                            )}
                          </td>
                          <td className="flex-1 text-center">
                            <div className="flex gap-1 mt-1 items-center justify-between w-full px-4">
                              <button
                                onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 cursor-pointer border rounded text-orange-500 hover:bg-orange-100 disabled:opacity-50"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="text-sm w-5 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                className="p-1 cursor-pointer border rounded text-orange-500 hover:bg-orange-100"
                              >
                                <Plus size={14} />
                              </button>
                              <button
                                onClick={() => removeFromCart(item.product_id)}
                                className="ml-3 cursor-pointer p-1 text-red-500 hover:bg-red-100 rounded"
                              >
                                <Trash2 size={14} />
                              </button>
                              <span className="text-sm ml-auto text-orange-500 font-semibold ms-2">
                                ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}

              <tr>
                <td style={{ padding: "0 16px" }}>
                  <table
                    style={{
                      width: "240px",
                      boxShadow: "0 0 3px rgba(60, 72, 88, 0.15)",
                      borderRadius: "6px",
                      marginLeft: "auto",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td style={{ padding: 16 }}>
                          <table style={{ width: "100%" }}>
                            <tbody>
                              <tr>
                                <td style={{ fontWeight: 500 }}>Subtotal:</td>
                                <td style={{ color: "#94a3b8", textAlign: "right" }}>$ {subtotal}</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: 500, paddingTop: 10 }}>Taxes:</td>
                                <td style={{ color: "#94a3b8", textAlign: "right" }}>$ {tax}</td>
                              </tr>
                              <tr>
                                <td style={{ fontWeight: 600, paddingTop: 10 }}>Total:</td>
                                <td style={{ fontWeight: 600, textAlign: "right" }}>$ {total}</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>

              <tr style={{ textAlign: "right" }}>
                <td style={{ padding: 16 }}>
                  <Link
                    href="/checkout"
                    style={{
                      padding: "8px 20px",
                      fontSize: 15,
                      fontWeight: 500,
                      borderRadius: 6,
                      backgroundColor: "#f97316",
                      border: "1px solid #f97316",
                      color: "#fff",
                      textDecoration: "none",
                    }}
                  >
                    Checkout
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </FrontendLayout>
    </>
  );
}
