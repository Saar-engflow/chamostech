'use client';

import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Counter } from "@/components/ui/counter";
import { ServiceCarousel, type Service } from "@/components/ui/services-card";
import { StaggerSpecialties, type Specialty } from "@/components/ui/stagger-specialties";
import { Testimonials } from "@/components/ui/testimonials-columns-1";
import { BlogSection } from "@/components/ui/blog-section";
import { ContactSection } from "@/components/ui/contact-section";
import { ChevronRight, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

// Reusable animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const leftVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const rightVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const coreServices: Service[] = [
    {
      number: "001",
      title: "Custom Software",
      description: "Tailored solutions built from the ground up to solve your unique business challenges.",
      imgSrc: "/custom-software.jpg",
    },
    {
      number: "002",
      title: "Web Applications",
      description: "Scalable, secure, and high-performance web platforms that deliver exceptional user experiences.",
      imgSrc: "/web-app.jpg",
    },
    {
      number: "003",
      title: "Mobile Apps",
      description: "Native and cross-platform mobile apps that keep your business connected on the go.",
      imgSrc: "/mobile-development.jpg",
    },
    {
      number: "004",
      title: "Business Automation",
      description: "Streamline your workflows and reduce manual effort with intelligent automation systems.",
      imgSrc: "/business-automation.jpg",
    },
    {
      number: "005",
      title: "API Development",
      description: "Robust and well-documented APIs that enable seamless communication between your systems.",
      imgSrc: "/api-dev.jpg",
    },
    {
      number: "006",
      title: "Cloud Solutions",
      description: "Modern cloud infrastructure design and migration for maximum scalability and reliability.",
      imgSrc: "/cloud-solutions.png",
    },
  ];

  const specialtyItems: SpecialtyItem[] = [
    {
      tempId: 0,
      title: "University Management System",
      description: "A comprehensive digital ecosystem for modern educational institutions, managing everything from admissions to alumni.",
      imgSrc: "/university-management-system.jpeg"
    },
    {
      tempId: 1,
      title: "Business Management System",
      description: "Enterprise-grade ERP solutions designed to streamline operations, finance, and human resources for growing companies.",
      imgSrc: "/business-management-system.jpeg"
    },
    {
      tempId: 2,
      title: "Fleet Management System",
      description: "Real-time tracking, maintenance scheduling, and logistics optimization for transportation and delivery businesses.",
      imgSrc: "/fleet-management-system.jpeg"
    },
    {
      tempId: 3,
      title: "Hospital Management System",
      description: "Secure and efficient platforms for healthcare providers to manage patient records, appointments, and billing.",
      imgSrc: "/hospital-management-system.jpeg"
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full flex justify-center pointer-events-none">
        <div className={`flex items-center justify-between px-6 py-3 transition-all duration-500 ease-in-out pointer-events-auto border ${
          isScrolled 
            ? 'mt-4 w-[90%] max-w-5xl bg-white/70 dark:bg-bg-dark/70 backdrop-blur-xl border-white/40 dark:border-white/10 rounded-full shadow-2xl py-2' 
            : 'mt-0 w-full max-w-7xl bg-transparent border-transparent'
        }`}>
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
              <Image
                src="/chamos-tech-logo.jpeg"
                alt="Chamos Tech Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xl font-bold tracking-tight text-bg-dark dark:text-text-primary">
              CHAMOS<span className="text-primary-orange">TECH</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium">
              <Link href="/" className="px-4 py-2 rounded-full text-text-dark dark:text-text-secondary transition-all hover:bg-primary-blue/10 hover:text-primary-blue">
                Home
              </Link>
              <Link href="#services" className="px-4 py-2 rounded-full text-text-dark dark:text-text-secondary transition-all hover:bg-primary-blue/10 hover:text-primary-blue">
                Services
              </Link>
              <Link href="#blog" className="px-4 py-2 rounded-full text-text-dark dark:text-text-secondary transition-all hover:bg-primary-blue/10 hover:text-primary-blue">
                Blog
              </Link>
              <Link href="#contact" className="px-4 py-2 rounded-full text-text-dark dark:text-text-secondary transition-all hover:bg-primary-blue/10 hover:text-primary-blue">
                Contact
              </Link>
            </nav>
          <div className="flex items-center">
            <Link href="#contact">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - No animation */}
        <section className="relative overflow-hidden bg-bg-light py-24 sm:py-32">
          <BackgroundPaths />
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-[10%] -left-[10%] h-[600px] w-[600px] rounded-full bg-primary-blue/5 blur-3xl" />
            <div className="absolute -bottom-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-primary-orange/5 blur-3xl" />
          </div>

          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center gap-8">
              <div className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-text-dark shadow-sm">
                <span className="mr-2 rounded-full bg-primary-blue px-2 py-0.5 text-[10px] text-white">NEW</span>
                Enterprise solutions for the modern era
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-text-dark sm:text-5xl lg:text-6xl text-center">
                Custom Software Solutions For <span className="text-primary-blue">Growing Businesses</span>
              </h1>
              <p className="max-w-[700px] text-lg text-gray-600 sm:text-xl text-center">
                We build scalable, high-performance systems tailored to your business needs. 
                From web apps to complex automation, we bridge the gap between vision and reality.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row items-center">
                <Link href="#contact">
                  <Button size="lg" className="h-14 px-8 text-lg">
                    Start Your Project
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#services">
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg border-gray-300 text-text-dark hover:bg-gray-100">
                    Our Services
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-2xl font-bold text-text-dark">
                    <Counter end={100} suffix="+" />
                  </span>
                  <span className="text-sm text-gray-600">Projects Delivered</span>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-2xl font-bold text-text-dark">
                    <Counter end={50} suffix="+" />
                  </span>
                  <span className="text-sm text-gray-600">Happy Clients</span>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div className="flex flex-col gap-1 items-center">
                  <span className="text-2xl font-bold text-text-dark">
                    <Counter end={99} suffix="%" />
                  </span>
                  <span className="text-sm text-gray-600">Satisfaction Rate</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Animation from left */}
        <SectionWrapper id="services" variant="left">
          <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-start gap-4 text-left mb-16 max-w-7xl mx-auto px-4">
                <h2 className="text-sm font-bold tracking-wider text-primary-blue uppercase">Our Expertise</h2>
                <h3 className="text-6xl font-bold tracking-tighter text-text-dark sm:text-7xl">
                  Services.
                </h3>
                <p className="max-w-[600px] text-gray-600 text-lg">
                  We provide a wide range of services to help your business grow and succeed in the digital age.
                </p>
              </div>
              <ServiceCarousel services={coreServices} />
            </div>
          </section>
        </SectionWrapper>

        {/* Specialties Section - Animation from right */}
        <SectionWrapper id="specialties" variant="right">
          <section className="py-24 bg-bg-light">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center gap-4 text-center mb-16">
                <h2 className="text-sm font-bold tracking-wider text-primary-blue uppercase">What We Build</h2>
                <h3 className="text-5xl font-bold tracking-tighter text-text-dark sm:text-6xl">
                  Our Specialties.
                </h3>
                <p className="max-w-[800px] text-gray-600 text-lg">
                  We specialize in building complex, industry-specific systems that solve real-world problems.
                </p>
              </div>
              <StaggerSpecialties specialties={specialtyItems} />
            </div>
          </section>
        </SectionWrapper>

        {/* Testimonials Section */}
        <SectionWrapper variant="bottom">
          <Testimonials />
        </SectionWrapper>

        {/* Blog Section */}
        <SectionWrapper id="blog" variant="bottom">
          <BlogSection />
        </SectionWrapper>

        {/* Contact Section */}
        <SectionWrapper id="contact" variant="bottom">
          <ContactSection />
        </SectionWrapper>
      </main>

      {/* Footer - Animation from bottom */}
      <SectionWrapper variant="bottom">
        <footer className="border-t bg-bg-dark py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {/* Company Info */}
              <div className="lg:col-span-1 lg:col-start-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src="/chamos-tech-logo.jpeg"
                      alt="Chamos Tech Logo"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-text-primary">
                    CHAMOS<span className="text-primary-orange">TECH</span>
                  </span>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Your trusted partner for web design, mobile apps, digital branding, and enterprise software.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold text-text-primary mb-6">Quick Links</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="/" className="text-gray-400 hover:text-primary-blue transition-colors text-base">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="#services" className="text-gray-400 hover:text-primary-blue transition-colors text-base">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link href="#blog" className="text-gray-400 hover:text-primary-blue transition-colors text-base">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="#contact" className="text-gray-400 hover:text-primary-blue transition-colors text-base">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Our Specialties */}
              <div>
                <h4 className="text-lg font-bold text-text-primary mb-6">Our Specialties</h4>
                <ul className="space-y-4">
                  <li>
                    <Link href="#specialties" className="text-gray-400 hover:text-primary-blue transition-colors text-base">
                      University Management System
                    </Link>
                  </li>
                  <li>
                    <Link href="#specialties" className="text-gray-400 hover:text-primary-blue transition-colors text-base">
                      Business Management System
                    </Link>
                  </li>
                  <li>
                    <Link href="#specialties" className="text-gray-400 hover:text-primary-blue transition-colors text-base">
                      Fleet Management System
                    </Link>
                  </li>
                  <li>
                    <Link href="#specialties" className="text-gray-400 hover:text-primary-blue transition-colors text-base">
                      Hospital Management System
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-bold text-text-primary mb-6">Contact Info</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-blue mt-0.5" />
                    <span className="text-gray-400 text-base">
                      Lusaka, Zambia
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-primary-blue" />
                    <span className="text-gray-400 text-base">
                      0766562299 / 0974401570
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <a href="https://wa.me/260766562299" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors text-base">
                      +260 766562299
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary-blue" />
                    <span className="text-gray-400 text-base">
                      chamosdistributionltd@gmail.com
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800 mt-10 pt-8 flex justify-center">
              <p className="text-sm text-gray-500">
                © 2026 CHAMOS TECH. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </SectionWrapper>
    </div>
  );
}

// Section Wrapper Component
function SectionWrapper({ id, children, variant }: { id?: string, children: React.ReactNode, variant: 'left' | 'right' | 'bottom' }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  
  let variants = sectionVariants;
  if (variant === 'left') variants = leftVariant;
  if (variant === 'right') variants = rightVariant;

  return (
    <motion.div
      id={id}
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}