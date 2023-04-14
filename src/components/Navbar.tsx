import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Contact from "@/components/forms/Contact";

interface NavItemProps {
  href: string;
  label: string;
  isOpen: boolean;
}

function NavItem({ href, label }: NavItemProps) {
  const isActive = usePathname() === href;

  return (
    <Link
      href={href}
      className={cn(
        isActive
          ? "border-b border-[#0FD998] text-[#0FD998]"
          : "text-white hover:text-gray-400",
        "uppercase transition-all duration-200 ease-in-out hover:opacity-80"
      )}
    >
      <span className="text-lg">{label}</span>
    </Link>
  );
}

export default function Navbar() {
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    function handleResize() {
      window.innerWidth >= 768 && setIsOpen(false);
    }

    function handleScroll() {
      const isScrolledNow = window.scrollY > 0;
      setIsScrolled(isScrolledNow);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Contact isOpen={contactIsOpen} setIsOpen={setContactIsOpen} />
      <nav
        className={cn(
          isScrolled
            ? "bg-[#0E212D] shadow-md transition"
            : "border-b border-[#0FD99840]",
          "fixed top-0 z-40 flex h-[79px] w-full flex-row items-center justify-between px-6 px-[22px] lg:px-[50px]"
        )}
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/static/assets/logo.svg"
            alt="Logo"
            width={170}
            height={64}
          />
        </Link>

        <div className="hidden items-center space-x-4 md:flex">
          <NavItem href={"/about"} label={"About"} isOpen={isOpen} />
          <button
            className="text-lg uppercase text-white transition-all duration-200 ease-in-out hover:opacity-80"
            onClick={() => setContactIsOpen(true)}
          >
            Contact
          </button>
        </div>
        {/* Mobile menu button */}

        <div className="flex items-center md:hidden">
          <button
            onClick={toggleMenu}
            className="p-3 text-2xl text-gray-200 focus:outline-none"
          >
            <Image
              width={24}
              height={24}
              src="/static/assets/menu.svg"
              alt="Menu"
            />
          </button>
        </div>

        <AnimatePresence key="menu">
          {isOpen && (
            <motion.div
              className="fixed right-0 top-0 z-40 flex h-screen w-full flex-col justify-start overflow-y-hidden bg-[#0E212D]"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Expandable menu */}
              <div className="flex w-full items-center justify-between border-b border-[#0FD998]/25 px-8 py-6">
                {/* Close button */}
                <span className="text-xl text-gray-100">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="p-3 text-2xl text-gray-100 transition hover:text-gray-300 focus:outline-none"
                >
                  <Image
                    width={24}
                    height={24}
                    src="/static/assets/close.svg"
                    alt="Close"
                  />
                </button>
              </div>
              <div className="flex h-full flex-col items-start justify-between overflow-y-auto">
                {/* Links */}
                <div className="flex w-full flex-col items-start space-y-6 px-8 py-12">
                  {isOpen && <NavItem href="/" label="Home" isOpen={isOpen} />}
                  <NavItem href={"/about"} label={"About"} isOpen={isOpen} />
                  <button
                    className="text-lg uppercase text-white transition-all duration-200 ease-in-out hover:opacity-80"
                    onClick={() => setContactIsOpen(true)}
                  >
                    Contact
                  </button>
                </div>

                {/* Footer */}
                <div className="flex w-full flex-col space-y-8 px-8 py-12">
                  <Image
                    src="/static/assets/logo.svg"
                    alt="Logo"
                    width={150}
                    height={40}
                  />

                  {/* Social icons */}
                  <span className="flex flex-row items-center space-x-4">
                    <Link href="https://facebook.com/groups/wronarobotics">
                      <Image
                        src="/static/assets/facebook-fill.svg"
                        width={40}
                        height={40}
                        alt="Facebook logo"
                      />
                    </Link>
                    <Link href="https://instagram.com/wrona.robotics">
                      <Image
                        src="/static/assets/instagram-fill.svg"
                        width={40}
                        height={40}
                        alt="Instagram logo"
                      />
                    </Link>
                    <Link href="https://twitter.com/WronaRobotics">
                      <Image
                        src="/static/assets/twitter-fill.svg"
                        width={40}
                        height={40}
                        alt="Twitter logo"
                      />
                    </Link>
                  </span>

                  {/* Copyright */}
                  <span className="text-sm text-gray-100">
                    © {new Date().getFullYear()} Wrona Robotics. All rights
                    reserved.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <style jsx global>{`
          html {
            overflow-y: ${isOpen ? "hidden" : "auto"};
            scrollbar-width: ${isOpen ? "none" : "unset"};
            -ms-overflow-style: ${isOpen ? "none" : "unset"};
          }
        `}</style>
      </nav>
    </>
  );
}
