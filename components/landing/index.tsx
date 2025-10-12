import React from "react";
import Hero from "./Hero";
import Footer from "./Footer";
import Header from "./Header";
import About from "./about";
import How from "./How";

const Landing = () => {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <About />
      <How />
      <Footer />
    </main>
  );
};

export default Landing;
