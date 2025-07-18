import { useEffect, useState } from "react";
import { MdArrowUpward } from "react-icons/md"; // Using Material Design icon via react-icons

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      id="back-to-top"
      className={`back-to-top cursor-pointer fixed text-lg rounded-full z-10 bottom-5 end-5 size-9 flex justify-center items-center bg-orange-500 text-white transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-label="Back to top"
    >
      <MdArrowUpward className="text-xl" />
    </button>
  );
};

export default BackToTopButton;
