"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface SsoLoginButtonProps {
  redirectPath?: string;
  className?: string;
}

export default function SsoLoginButton({ 
  redirectPath = "/dashboard",
  className = ""
}: SsoLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

  const handleSsoLogin = async () => {
    try {
      setIsLoading(true);
      const redirectUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/workos/redirect?redirect=${encodeURIComponent(redirectPath)}`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("SSO login error:", error);
      toast.error("Failed to initiate SSO login");
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSsoLogin}
      disabled={isLoading}
      className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ${className}`}
    >
      {isLoading ? (
        <span>Connecting to SSO...</span>
      ) : (
        <span>Continue with SSO</span>
      )}
    </button>
  );
} 