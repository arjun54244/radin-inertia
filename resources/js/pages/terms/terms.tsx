import { useState } from "react";
import BreadCroumLight from "@/components/frontend/BreadCroum";
import FrontendLayout from "@/layouts/frontend-layout";

interface FAQ {
  question: string;
  answer: string;
}

interface Term {
  title: string;
  slug: string;
  description: string;
  faqs: FAQ[];
  status: boolean;
}

// FAQ Accordion Component
const FAQAccordion = ({ faqs }: { faqs: FAQ[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <h5 className="text-xl font-semibold mt-10">Users Question & Answer :</h5>
      <div className="mt-6">
        {faqs.map((faq, index) => (
          <div key={index} className="relative shadow-sm dark:shadow-gray-800 rounded-md overflow-hidden mt-4">
            <h2 className="text-base font-semibold">
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center p-5 w-full font-medium text-start"
              >
                <span>{faq.question}</span>
                <svg
                  className={`size-4 shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </h2>
            {openIndex === index && (
              <div className="p-5 border-t border-gray-700 dark:border-gray-800">
                <p className="text-slate-400 dark:text-gray-400">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default function TermsPage({ term }: { term: Term }) {
  if (!term?.status) {
    return (
      <FrontendLayout>
        <div className="text-center py-32">
          <h1 className="text-3xl font-semibold text-gray-600">Terms are not active.</h1>
        </div>
      </FrontendLayout>
    );
  }

  return (
    <FrontendLayout>
      <BreadCroumLight title={term.title} items={[{ label: "Home", url: "/" }, { label: term.title }]} />

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="md:flex justify-center">
            <div className="md:w-3/4">
              <div className="p-6 bg-white dark:bg-slate-900 shadow-sm dark:shadow-gray-800 rounded-md">
                <div
                  className="prose prose-slate dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: term.description }}
                />

                {term.faqs?.length > 0 && <FAQAccordion faqs={term.faqs} />}

                <div className="mt-6">
                  <a
                    href="#"
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white rounded-md"
                  >
                    Accept
                  </a>
                  <a
                    href="#"
                    className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-transparent hover:bg-orange-500 border-orange-500 text-orange-500 hover:text-white rounded-md ms-2"
                  >
                    Decline
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FrontendLayout>
  );
}
