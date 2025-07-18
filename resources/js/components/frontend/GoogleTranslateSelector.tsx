import { useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "gu", label: "Gujarati" },
  { code: "bn", label: "Bengali" },
  { code: "mr", label: "Marathi" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
];

export default function GoogleTranslateSelector() {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  const handleLanguageChange = (code: string) => {
    const iframe = document.querySelector("iframe.goog-te-menu-frame") as HTMLIFrameElement;
    if (!iframe) return;

    const innerDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!innerDoc) return;

    const langItem = [...innerDoc.querySelectorAll(".goog-te-menu2-item")].find(el =>
      el.textContent?.toLowerCase().includes(code.toLowerCase())
    );

    if (langItem) {
      (langItem as HTMLElement).click();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Language" />
        </SelectTrigger>
        <SelectContent>
          {languages.map(lang => (
            <SelectItem key={lang.code} value={lang.label.toLowerCase()}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Invisible Google Translate div (required by Google) */}
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
}
