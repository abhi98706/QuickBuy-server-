"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../assets/logo.png";
import { useAppContext } from "@/context/AppContext";

const Shipping = () => {
  const router = useRouter();
  const { products, cartItems, getCartAmount } = useAppContext();

  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [pincode, setPincode] = React.useState("");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const [isPaymentDropdownOpen, setIsPaymentDropdownOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const goToSuccess = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    setLoading(true);

    try {
      const orderedProducts = [];

      for (const itemId in cartItems) {
        if (cartItems[itemId] > 0) {
          const product = products.find(p => p._id === itemId);
          if (product) {
            orderedProducts.push({
              productId: itemId,
              name: product.name,
              price: product.offerPrice,
              quantity: cartItems[itemId],
              subtotal: product.offerPrice * cartItems[itemId],
            });
          }
        }
      }

      const totalAmount = getCartAmount();

      if (orderedProducts.length === 0) {
        alert('Your cart is empty!');
        setLoading(false);
        return;
      }

      // Combine address fields into one string
      const fullAddress = `${addressLine1}, ${addressLine2 ? addressLine2 + ', ' : ''}${city}, ${state} - ${pincode}`;

      const res = await fetch('/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone,
          address: fullAddress,
          paymentMethod,
          products: orderedProducts,
          totalAmount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        router.push('/success');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(90deg, #e2e2e2, #f7cd9d)" }}
    >
      <header className="flex justify-between items-center px-8 py-5">
        <h2 className="text-3xl font-bold">
          <Image src={logo} alt="QuickBuy" height={40} />
        </h2>
      </header>

      <div
        className="max-w-[500px] mx-auto bg-white rounded-[20px] px-[30px] py-[40px]"
        style={{
          marginTop: "80px",
          marginBottom: "60px",
          boxShadow: "0 4px 24px rgba(236, 180, 116, 0.2)",
        }}
      >
        <div
          className="text-center text-white"
          style={{
            background: "#e28417",
            padding: "30px 20px",
            borderRadius: "20px 20px 50px 50px",
            margin: "-40px -30px 30px -30px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.1)",
          }}
        >
          <h2 className="text-[26px] font-bold">Shipping Details</h2>
        </div>

        <form onSubmit={goToSuccess}>
          {/* Full Name */}
          <label className="font-semibold block mb-2">Full Name</label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-[10px] mb-4 border-2 border-[#ecb474] rounded-md outline-none"
            placeholder="Enter your full name"
          />

          {/* Mobile Number */}
          <label className="font-semibold block mb-2">Mobile Number</label>
          <input
            type="tel"
            pattern="[0-9]{10}"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-[10px] mb-4 border-2 border-[#ecb474] rounded-md outline-none"
            placeholder="10-digit mobile number"
          />

          {/* Address Line 1 */}
          <label className="font-semibold block mb-2">Address Line 1</label>
          <input
            type="text"
            required
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            className="w-full p-[10px] mb-4 border-2 border-[#ecb474] rounded-md outline-none"
            placeholder="House No., Street, Area"
          />

          {/* Address Line 2 */}
          <label className="font-semibold block mb-2">
            Address Line 2{" "}
            <span className="text-gray-400 font-normal text-sm">(optional)</span>
          </label>
          <input
            type="text"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            className="w-full p-[10px] mb-4 border-2 border-[#ecb474] rounded-md outline-none"
            placeholder="Landmark, Apartment (optional)"
          />

          {/* City and State side by side */}
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="font-semibold block mb-2">City</label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-[10px] border-2 border-[#ecb474] rounded-md outline-none"
                placeholder="City"
              />
            </div>
            <div className="flex-1">
              <label className="font-semibold block mb-2">State</label>
              <input
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-[10px] border-2 border-[#ecb474] rounded-md outline-none"
                placeholder="State"
              />
            </div>
          </div>

          {/* Pincode */}
          <label className="font-semibold block mb-2">Pincode</label>
          <input
            type="text"
            required
            pattern="[0-9]{6}"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full p-[10px] mb-4 border-2 border-[#ecb474] rounded-md outline-none"
            placeholder="6-digit pincode"
          />

          {/* Payment Method */}
          <label className="font-semibold block mb-2">Payment Method</label>
          <div className="relative w-full mb-4">
            <button
              type="button"
              onClick={() => setIsPaymentDropdownOpen(!isPaymentDropdownOpen)}
              className="w-full p-[10px] border-2 border-[#ecb474] rounded-md bg-white text-left flex justify-between items-center outline-none cursor-pointer"
            >
              <span className={paymentMethod ? "text-gray-700" : "text-gray-400"}>
                {paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : paymentMethod === "online"
                  ? "Online (PhonePe / GPay)"
                  : "Select Payment Method"}
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isPaymentDropdownOpen ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isPaymentDropdownOpen && (
              <ul className="absolute w-full bg-white border-2 border-[#ecb474] rounded-md mt-1 z-10 overflow-hidden shadow-md">
                <li className="flex items-center justify-between px-[10px] py-[10px] text-gray-400 cursor-not-allowed bg-gray-50">
                  <span>Online (PhonePe / GPay)</span>
                  <span className="text-xs font-semibold text-red-400 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                    Unavailable
                  </span>
                </li>
                <li
                  className="flex items-center px-[10px] py-[10px] text-gray-700 hover:bg-orange-50 cursor-pointer"
                  onClick={() => {
                    setPaymentMethod("cod");
                    setIsPaymentDropdownOpen(false);
                  }}
                >
                  Cash on Delivery
                </li>
              </ul>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="block mx-auto mt-5 h-12 px-10 text-white rounded-lg border-none cursor-pointer"
            style={{
              background: loading ? "#ccc" : "#e28417",
              boxShadow: "0 0 10px rgba(0,0,0,.1)",
            }}
          >
            {loading ? "Saving..." : "Proceed"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;