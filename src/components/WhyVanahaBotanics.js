import { motion } from "framer-motion";
import { LuMapPin, LuRecycle  } from "react-icons/lu";
import { FaLeaf } from "react-icons/fa";
import { MdCrueltyFree } from "react-icons/md";

const reasons = [
  {
    id: 1,
    title: "100% Natural",
    icon: FaLeaf,
  },
  {
    id: 2,
    title: "Eco-Friendly",
    icon: LuRecycle,
  },
  {
    id: 3,
    title: "Cruelty-Free",
    icon: MdCrueltyFree,
  },
  {
    id: 4,
    title: "Made in India",
    icon: LuMapPin,
  },
];

export default function WhyVanahaBotanics() {
  return (
    <section className="relative bg-[#FAFAF7] py-16 md:py-24">
      
      {/* Section Title */}
      <h2 className="text-center text-[30px] md:text-4xl font-cormorant text-[#2F5D50] mb-14">
        Why Vanaha Botanics
      </h2>

      {/* Items */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
        {reasons.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col items-center gap-4"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-full bg-[#EAF2EE] flex items-center justify-center">
                <Icon className="w-6 h-6 text-[#6FAF98]" />
              </div>

              {/* Text */}
              <p className="text-sm md:text-base font-inter text-[#4B5563]">
                {item.title}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}