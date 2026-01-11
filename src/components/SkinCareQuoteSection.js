import Image from "next/image";
import skincareImg from "../../public/images/vana_bg/facial_mask.jpg";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";


export default function SkinCareQuoteSection() {

  const router = useRouter();

  return (
    <section className="bg-section py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT IMAGE */}
        <div className="relative w-full h-[360px] md:h-[480px] rounded-2xl overflow-hidden shadow-sm">
          <Image
            src={skincareImg}
            alt="Natural skincare"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT QUOTE */}
        <div className="text-center md:text-left">
          <p className="text-3xl md:text-4xl font-cormorant text-brand leading-snug">
            “Nurture your skin with nature’s kindness, and let your natural
            beauty glow.”
          </p>

          <p className="mt-6 text-base text-gray-600 font-inter max-w-md">
            Gentle botanical care designed to nourish deeply and bring your skin
            and hair back to balance
          </p>

            <motion.button
            onClick={() => router.push('/products')}
            className="
                bg-brand text-white text-lg font-inter md:text-[18px]
                px-8 py-4 mt-8 rounded-full cursor-pointer
                shadow-sm
            "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{
                y: -3,
                boxShadow: "0 12px 28px rgba(47, 93, 80, 0.35)",
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                Explore Products &rarr;
            </motion.button>

        </div>
      </div>
    </section>
  );
}
