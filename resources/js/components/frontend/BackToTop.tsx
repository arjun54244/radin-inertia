"use client"; // Ensure it's a client component

import { useEffect } from "react";

export default function BackToTop() {
  useEffect(() => {
    const button = document.getElementById("back-to-top");

    const scrollFunction = () => {
      if (button) {
        if (window.scrollY > 500) {
          button.classList.add("flex");
          button.classList.remove("hidden");
        } else {
          button.classList.add("hidden");
          button.classList.remove("flex");
        }
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      window.removeEventListener("scroll", scrollFunction); // Cleanup on unmount
    };
  }, []);

  const topFunction = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <button
        onClick={topFunction}
        id="back-to-top"
        className="back-to-top fixed hidden text-lg rounded-full z-10 bottom-5 end-5 size-9 text-center bg-orange-500 text-white flex justify-center items-center"
      >
        <i className="mdi mdi-arrow-up"></i>
      </button>
    </div>
  );
}
