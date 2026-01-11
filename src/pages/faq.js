"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How long does henna last on the skin?",
      answer:
        "Henna typically lasts between 7–14 days depending on skin type and aftercare. Keeping the area dry for the first 24 hours helps extend the stain.",
    },
    {
      question: "Is your henna safe for all skin types?",
      answer:
        "Yes! Our henna products are natural and skin-friendly. They do not contain harmful chemicals or artificial dyes.",
    },
    {
      question: "Do you provide shipping across India?",
      answer:
        "Yes, we offer fast and reliable shipping throughout India. Delivery time usually ranges from 3–7 working days.",
    },
    {
      question: "How should I take care of the henna design?",
      answer:
        "Avoid washing the area for at least 8 hours. Apply coconut oil or sugar–lemon mix for a darker stain.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle open/close
  };

  return (
    <div className="pt-30 pb-16 bg-[#FAFAF7] min-h-screen">
      <h2 className="text-3xl md:text-4xl font-cormorant text-center text-brand mb-12">
        Frequently Asked Questions
      </h2>

      <div className="w-[90%] md:w-[60%] mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="
          border border-[#E6ECE8]
          rounded-2xl
          bg-white
          shadow-[0_8px_24px_rgba(47,93,80,0.06)]
          transition-all
        "
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(index)}
              className="
            w-full
            flex
            justify-between
            items-center
            text-left
            px-6
            py-5
            cursor-pointer
          "
            >
              <span className="font-inter font-medium text-lg text-brand">
                {faq.question}
              </span>

              <FaChevronDown
                size={16}
                className={`
              text-[#6FAF98]
              transition-transform duration-300
              ${openIndex === index ? "rotate-180" : ""}
            `}
              />
            </button>

            {/* Answer */}
            <div
              className={`
            overflow-hidden
            transition-all duration-300 ease-in-out
            ${openIndex === index ? "max-h-40 px-6 pb-5" : "max-h-0"}
          `}
            >
              <p className="text-[#4B5563] leading-relaxed text-sm md:text-base">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
