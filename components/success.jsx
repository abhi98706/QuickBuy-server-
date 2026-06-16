"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../assets/logo.png";

const Success = () => {
  const router = useRouter();

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(90deg, #e2e2e2, #f7cd9d)" }}
    >
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-5">
        <h2 className="text-3xl font-bold">
          <Image src={logo} alt="QuickBuy" height={40} />
        </h2>
      </header>

      {/* Success Card */}
      <div
        style={{
          maxWidth: "470px",
          width: "470px",
          margin: "100px auto 60px auto",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(236, 180, 116, 0.2)",
          padding: "40px 30px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Green Tick Icon */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: "#28a745",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "28px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: "58px", height: "58px" }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <p
          style={{
            fontSize: "20px",
            color: "#333",
            fontWeight: 600,
            marginBottom: "24px",
          }}
        >
          Thank you for your purchase. Your order will be delivered within 7 days.
        </p>

        <button
          onClick={() => router.push("/")}
          style={{
            width: "240px",
            fontSize: "1.1em",
            marginBottom: "28px",
            padding: "10px 0",
            background: "#e28417",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Return to Home
        </button>

        {/* Divider */}
        <hr style={{ width: "100%", borderColor: "#e0e0e0", marginBottom: "16px" }} />

        {/* Contact line */}
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "0" }}>
          For further query Contact us :{" "}
          <strong>quickbuy0126@gmail.com</strong>
          {" / "}
          <strong>8981697234</strong>
        </p>
      </div>
    </div>
  );
};

export default Success;
