"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: typeof testimonials;
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
              <div className="p-8 rounded-3xl border border-gray-200 bg-white shadow-lg shadow-blue-500/5 max-w-xs w-full" key={i}>
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0066FF" className="text-primary-blue">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27 8.91 6.26 12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-text-dark font-medium leading-relaxed mb-6">
                  "{text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-primary-blue font-bold text-sm">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-text-dark tracking-tight">{name}</div>
                    <div className="text-sm text-gray-600 tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "Their 24/7 support is unmatched. True professionals.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Linda T.",
    role: "Founder, TechStart",
  },
  {
    text: "CHAMOS TECH transformed our online presence completely.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Sarah M.",
    role: "CEO, RetailHub",
  },
  {
    text: "Custom software that actually solves real business needs.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "David K.",
    role: "Director, InnovateCo",
  },
  {
    text: "Delivered on time and exceeded our expectations.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Jessica L.",
    role: "Product Lead, CloudTech",
  },
  {
    text: "Highly recommend for any business looking to scale.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Michael R.",
    role: "CFO, GrowthCo",
  },
  {
    text: "Their attention to detail and quality is impressive.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Aisha P.",
    role: "CTO, DataFlow",
  },
];

const firstColumn = testimonials.slice(0, 2);
const secondColumn = testimonials.slice(2, 4);
const thirdColumn = testimonials.slice(4, 6);

const Testimonials = () => {
  return (
    <section className="bg-bg-light py-24">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-gray-200 bg-white py-2 px-5 rounded-full text-sm font-semibold text-primary-blue">
              Testimonials
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mt-6 text-text-dark">
            What our clients say
          </h2>
          <p className="text-center mt-5 text-gray-600 text-lg">
            Don't just take our word for it — hear from those we've helped.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export { Testimonials };
