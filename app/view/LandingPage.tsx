"use client";
import Head from "next/head";
import Hero from "../components/landing_page/HeroSection";
import PopularCategories from "../components/landing_page/PopularCategoriesSection";
import Help from "../components/landing_page/HelpSection";
import Beneficts from "../components/landing_page/BenefictsSection";
import CTA from "../components/landing_page/CTASection";
import Footer from "../components/landing_page/Footer";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>ResuelveCuba - Tu red de profesionales en Cuba</title>
        <meta
          name="description"
          content="Encuentra profesionales de confianza en Cuba. Servicios y productos a tu alcance."
        />
        <meta
          name="keywords"
          content="profesionales Cuba, servicios Cuba, proveedores Cuba, resolver Cuba"
        />
        <meta
          property="og:title"
          content="ResuelveCuba - Tu red de profesionales"
        />
        <meta
          property="og:description"
          content="Conecta con los mejores profesionales en Cuba"
        />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <Hero />

      {/* Categorías populares */}
      <PopularCategories />

      {/* Cómo funciona */}
      <Help />

      {/* Beneficios */}
      <Beneficts />

      {/* CTA Final */}
      <CTA />

      {/* Footer */}
      <Footer />
    </>
  );
}
