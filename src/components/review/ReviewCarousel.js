"use client";

import { FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ReviewCarousel = () => {
  const reviews = [
    {
      id: 1,
      name: "Aishwarya",
      rating: 5,
      comment: "Loved the product! Amazing quality and beautiful design.",
    },
    {
      id: 2,
      name: "Rahul",
      rating: 4,
      comment: "Very good product. Delivery was a bit slow but worth it.",
    },
    {
      id: 3,
      name: "Meera",
      rating: 5,
      comment: "Exactly as shown! Highly recommended ❤️",
    },
    {
      id: 4,
      name: "Kiran",
      rating: 5,
      comment: "Superb quality! Will definitely order again.",
    },
  ];

  return (
    <div className="bg-section py-16 md:py-24">
      <div className="w-[92%] md:w-[80%] mx-auto">
        {/* Section Title */}
        <h2 className="text-center text-[28px] md:text-4xl font-cormorant text-brand mb-12">
          — What Our Customers Say —
        </h2>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-4"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <div
                className="
                  relative
                  p-6
                  bg-[#FAFAF7]
                  rounded-2xl
                  border border-[#E6ECE8]
                  shadow-[0_10px_30px_rgba(47,93,80,0.08)]
                  hover:shadow-[0_18px_40px_rgba(47,93,80,0.14)]
                  transition-all duration-300
                  min-h-[240px]
                  flex flex-col
                "
              >
                {/* Name + Stars */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text">
                    {review.name}
                  </h3>

                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={16}
                        className={
                          review.rating >= star
                            ? "text-[#C8A951]"
                            : "text-[#D1D5DB]"
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Decorative Divider */}
                <div className="w-10 h-[2px] bg-sage mt-3 rounded-full" />

                {/* Comment */}
                <p className="text-[#4B5563] mt-4 leading-relaxed text-sm md:text-base">
                  {review.comment}
                </p>

                {/* Rating Badge */}
                <span
                  className="
                    absolute bottom-4 right-4
                    text-sm font-semibold
                    text-brand
                    bg-[#EAF2EE]
                    px-3 py-1
                    rounded-full
                  "
                >
                  ★ {review.rating}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewCarousel;