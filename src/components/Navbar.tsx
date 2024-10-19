import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  links: { name: string; href: string; onClick?: () => void }[];
  title: string;
  color: string;
  onClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ links, title, onClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop.current) {
        setIsNavbarVisible(false);
        setIsMenuOpen(false);
      } else {
        setIsNavbarVisible(true);
      }
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLinkClick = (href: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    } else {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div
        ref={navbarRef}
        className={`bg-mydarkblue text-myoffwhite transition-transform duration-300 ${
          isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-8">
          <div
            className="flex items-center"
            onClick={onClick}
            style={{ cursor: "pointer" }}
          >
            <h1 className="text-xl font-bold">{title}</h1>
          </div>
          <button
            onClick={toggleMenu}
            className="text-myoffwhite focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div
        ref={menuRef}
        className={`fixed h-screen right-0 max-w-xs w-full z-60 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col justify-center items-center bg-mydarkblue`}
      >
        <ul className="space-y-8 text-center">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href, link.onClick);
                }}
                className="text-myoffwhite transition-colors duration-300 relative group"
              >
                {link.name}
                <span className="block h-0.5 bg-myoffwhite scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
