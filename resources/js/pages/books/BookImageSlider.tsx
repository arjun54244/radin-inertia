import React, { useRef, useState, useEffect } from "react";

interface BookImageSliderProps {
  images: string[];
  bookName: string;
}

const BookImageSlider: React.FC<BookImageSliderProps> = ({ images, bookName }) => {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const [imgIndex, setImgIndex] = useState(0);

  const slideImage = () => {
    const displayWidth = showcaseRef.current?.children[0]?.clientWidth || 0;
    if (showcaseRef.current) {
      showcaseRef.current.style.transform = `translateX(${-imgIndex * displayWidth}px)`;
    }
  };

  useEffect(() => {
    slideImage();
    window.addEventListener("resize", slideImage);
    return () => window.removeEventListener("resize", slideImage);
  }, [imgIndex]);

  return (
    <div>
      <ul className="product-imgs flex list-none items-center gap-4">
        {/* Thumbnails */}
        <li>
          <ul className="img-select list-none">
            {images.map((image, index) => (
              <li key={index} className="p-px w-20">
                <button
                  className={`focus:outline-none border ${imgIndex === index ? "border-orange-500" : "border-transparent"}`}
                  onClick={() => setImgIndex(index)}
                >
                  <img
                    src={`/storage/${image}`}
                    className="w-16 h-16 object-contain shadow-sm dark:shadow-gray-800"
                    alt={bookName}
                  />
                </button>
              </li>
            ))}
          </ul>
        </li>

        {/* Main Image Viewer */}
        <li className="overflow-hidden shadow-sm dark:shadow-gray-800">
          <div ref={showcaseRef} className="img-showcase flex w-full duration-500 transition-transform">
            {images.map((image, index) => (
              <img
                key={index}
                src={`/storage/${image}`}
                className="min-w-full object-contain"
                alt={`image-${index}`}
              />
            ))}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BookImageSlider;
