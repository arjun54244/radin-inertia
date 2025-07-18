import { useState } from "react";
import {
  FaWhatsapp,
  FaPhone,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaShareAlt,
} from "react-icons/fa";
import BackToTopButton from "./BackToTopButton";
import { InfoPage } from '@/types';



export default function FloatingContactButtons({ data }: { data: InfoPage }) {
  const socialLinks = [
    { icon: <FaFacebook />, url: data.facebook, label: "Facebook" },
    { icon: <FaInstagram />, url: data.instagram, label: "Instagram" },
    { icon: <FaYoutube />, url: data.youtube, label: "YouTube" },
    { icon: <FaLinkedin />, url: data.linkedin, label: "LinkedIn" },
  ];
  const [showSocials, setShowSocials] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-3 z-50">

      {/* Toggle Social Media */}
      {showSocials &&
        socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-blue-100 text-orange-600 transition-all"
            title={social.label}
          >
            {social.icon}
          </a>
        ))}

      {/* Toggle Button */}
      <button
        onClick={() => setShowSocials(!showSocials)}
        className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-full bg-orange-600 text-white hover:bg-blue-700 shadow-md transition-all"
        title="Toggle Social Media"
      >
        <FaShareAlt />
      </button>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${data.phones[0].number}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md transition-all"
        title="Chat on WhatsApp"
      >
        <FaWhatsapp />
      </a>

      {/* Call */}
      <a
        href={`tel:${data.phones[0].number}`}
        className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-full bg-blue-400 text-white hover:bg-blue-500 shadow-md transition-all"
        title="Call Us"
      >
        <FaPhone />
      </a>
      <div className="flex items-center cursor-pointer justify-center w-12 h-12 rounded-full transition-all"
      >
        <BackToTopButton />
      </div>

    </div>
  );
}
