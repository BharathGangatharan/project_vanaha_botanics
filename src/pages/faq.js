"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Are your products made with natural ingredients?",
      answer:
        "Yes. All our products are crafted using natural, plant-based ingredients and are free from harsh chemicals, artificial colors, and synthetic fragrances.",
    },
    {
      question: "Are your products safe for all skin and hair types?",
      answer:
        "Our products are gentle and suitable for most skin and hair types. However, we recommend doing a patch test before regular use, especially for sensitive skin.",
    },
    {
      question: "Are your eco-friendly products biodegradable?",
      answer:
        "Yes. Our eco-friendly range is made from sustainable, biodegradable materials that are safe for both you and the environment.",
    },
    {
      question: "How long does it take to see results from natural products?",
      answer:
        "Natural products work gradually. With regular use, you may start noticing visible improvements within 2–4 weeks, depending on the product and usage.",
    },
    {
      question: "Do you deliver products across India?",
      answer:
        "Yes, we provide reliable shipping across India. Orders are usually delivered within 3–7 working days based on your location.",
    },
    {
      question: "How should I store the products?",
      answer:
        "Store products in a cool, dry place away from direct sunlight to maintain their freshness and effectiveness.",
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
