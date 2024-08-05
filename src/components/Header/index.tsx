import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import "./Header.scss";

const Header: React.FC = () => {
  const pathname = usePathname();
  return (
    <header className="header">
      <div className="header-container">
        <div className="brand">
          <a href="#" className="logo">
            <Image
              src="/bower-logo.svg"
              width={0}
              height={0}
              sizes="100vw"
              alt={`bower-logo`}
              className="logo"
            />
          </a>
          <h1>Bower</h1>
          <h3 className="tagline">A package manager for&nbsp;the&nbsp;web</h3>
        </div>

        <div className="header-right">
          <a className={pathname === "/" ? "active" : ""} href="/">
            Home
          </a>
          <a
            className={pathname === "/contact" ? "active" : ""}
            href="/contact"
          >
            Contact
          </a>
          <a className={pathname === "/about" ? "active" : ""} href="/about">
            About
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
