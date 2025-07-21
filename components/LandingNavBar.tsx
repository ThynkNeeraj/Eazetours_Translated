import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/images/logo.png";

const LandingNavBar: React.FC = () => {
  const [displayStyle, setDisplayStyle] = useState<"block" | "none">("block");
  const [activePage, setActivePage] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 130) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentPath = window.location.pathname;
    setActivePage(currentPath);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 130) {
      setDisplayStyle("none");
    } else {
      setDisplayStyle("block");
    }

    setLastScrollTop(scrollTop <= 0 ? 0 : scrollTop);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollTop]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/packages", label: "Packages" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
  ];

  const handleLinkClick = (href: string) => {
    setActivePage(href);
    if (isMenuOpen) setIsMenuOpen(false); // Close the menu in mobile view when a link is clicked
  };

  const handleContactClick = () => {
    setActivePage(""); // Reset activePage to remove highlight from all links
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Pre-header */}
      <div className={`hidden sm:block  ${isScrolled ? "sm:block" : "hidden"}`}>
        <div
          className={`text-white h-[57px] py-[14px] px-[65px] font-urbanist md:flex justify-center transition-al sm:block duration-300 ${isScrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
          style={{ display: displayStyle }}
        >
          <div className="flex justify-between items-center text-xs md:text-sm w-full max-w-[1270px] mx-auto">
            {/* Contact Details */}
            <div className="flex gap-4">
              <span className="flex items-center gap-2">
                <span className="relative flex items-center justify-center rounded-full bg-transparent text-white">
                  <i className="fas fa-phone fa-flip-horizontal text-[15px]" />
                </span>
                <a href="tel:+919873186168" className="text-white text-[16px]">
                  +91 987 318 6168
                </a>
              </span>
              <span className="flex items-center gap-2">
                <i className="fas fa-envelope text-[18px]" />
                <span className="flex flex-wrap">
                  <a href="mailto:info@eazetours.com" className="text-white text-[16px]">
                    info@eazetours.com
                  </a>
                  ,
                  <a href="mailto:harshit@eazetours.com" className="text-white text-[16px] ml-1">
                    harshit@eazetours.com
                  </a>
                </span>
              </span>
            </div>
            {/* Social Icons */}

            <div className="flex gap-2">
              <a
                href="https://www.tripadvisor.in/Attraction_Review-g304551-d17734269-Reviews-EAZE_TOURS-New_Delhi_National_Capital_Territory_of_Delhi.html"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-7 h-7 flex items-center justify-center rounded-full bg-transparent border border-white text-white hover:bg-gray-300"
              >
                <i className="fab fa-tripadvisor text-sm leading-lg" />
              </a>

              <a
                href="https://www.instagram.com/eazetourpackages/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-7 h-7 flex items-center justify-center rounded-full bg-transparent border border-white text-white hover:bg-gray-300"
              >
                <i className="fab fa-instagram text-sm leading-lg" />
              </a>

              <a
                href="https://www.facebook.com/eazetour/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-7 h-7 flex items-center justify-center rounded-full bg-transparent border border-white text-white hover:bg-gray-300"
              >
                <i className="fab fa-facebook text-sm leading-lg" />
              </a>

              <a
                href="https://www.pinterest.com/eazetourpackages/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-7 h-7 flex items-center justify-center rounded-full bg-transparent border border-white text-white text-black hover:bg-gray-300"
              >
                <i className="fab fa-pinterest text-sm leading-lg" />
              </a>
              <div className="relative inline-block w-48">
                <select
                  className="bg-[#025c7a] text-white px-2 py-1 pr-10 rounded-[5px] appearance-none w-full"
                  onChange={(e) => {
                    const lang = e.target.value;
                    const select = document.querySelector(".goog-te-combo");
                    if (select instanceof HTMLSelectElement) {
                      select.value = lang;
                      select.dispatchEvent(new Event("change"));
                    }
                  }}
                >
                  <option value="">Select Language</option>
                  <option value="de">German</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div
        className={`flex items-center w-full font-urbanist h-[78px] text-neutral transition-all duration-300 ${isScrolled ? "bg-white border-b border-gray-300" : "bg-transparent"}`}
        style={{ display: displayStyle }}
      >
        <div
          className="navbar flex py-[15px] items-center justify-between"
          style={{ maxWidth: "1270px", margin: "0 auto" }}
        >
          {/* Logo */}
          <div className="navbar-start px-4 flex items-center" style={{ marginTop: "-10px" }}>
            <Link href="/" legacyBehavior>
              <a onClick={() => handleLinkClick("/")}>
                <Image src={logo} width={128} height={48} alt="Logo" />
              </a>
            </Link>
          </div>

          {/* Hamburger Menu */}
          <div className="md:hidden flex items-center pr-3 relative z-50">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="">
              <i
                className={`fas ${isMenuOpen ? "fa-times  text-[#025C7A]" : "fa-bars text-[#6E9753]"} text-xl`}
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center md:flex flex-grow hidden">
            <div className="flex items-center justify-center gap-4">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`btn btn-ghost btn-sm rounded-btn 
                        ${isScrolled ? "text-[#025C7A]" : "text-[#fff]"}
                        ${activePage === link.href ? "text-[#6E9753]" : "text-[#025C7A]"}
                        text-[16px]`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Sidebar */}
          <div
            className={`md:hidden fixed top-0 right-0 w-3/4 bg-white h-screen z-40 shadow-lg transform transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
          >
            <div className="flex flex-col absolute top-0 text-left items-start px-4 gap-4 py-16">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href} passHref>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className={`btn btn-ghost btn-sm rounded-btn ${activePage === link.href
                      ? "text-[#6E9753] text-[16px]"
                      : "text-[#025C7A] text-[16px]"
                      }`}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}

              {/* Add Contact Us only in Mobile Menu */}
              <Link href="/contact" passHref>
                <button
                  className={`btn btn-ghost btn-sm text-[16px] rounded-btn ${activePage === "/contact" ? "text-[#6E9753]" : "text-[#025C7A]"}`}
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* Contact Us Button (Desktop) */}
          <div className="navbar-end md:flex px-4 hidden">
            <Link href="/contact" passHref>
              <button
                onClick={handleContactClick}
                className={`btn flex items-center justify-center min-w-[173px] h-[46px] rounded-[41px] pr-[6px] pl-[10px] hover:bg-[#6E9753] ${isScrolled ? "bg-[#025C7A]" : "bg-transparent"}`}
              >
                <span
                  className="mr-2 text-white"
                  style={{
                    textTransform: "uppercase",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "19.2px",
                    textAlign: "left",
                  }}
                >
                  Contact Us
                </span>
                <span
                  className={`relative w-8 h-8 flex items-center justify-center rounded-full border border-white ${isScrolled ? "bg-[#fff]" : "bg-transparent"}`}
                >
                  <i
                    className={`fas fa-arrow-right text-lg ${isScrolled ? "text-[#025C7A]" : "text-[#fff]"}`}
                  />
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingNavBar;
