"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import "../styles/main.scss";
import Search from "@/components/Search";
import Sponsors from "@/components/Sponsors";
export default function Home() {
  return (
    <div className="App">
      <Header />

      <main>
        <div className="container">
          <Sponsors />
          <div className="flex-column-container ">
            <Search />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
