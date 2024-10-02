import { Link } from "react-router-dom";
import { Container } from "./Wrapper";
import { VersionsBtn } from "./VersionsBtn";
import Navbar, { NavBtn } from "./Navbar";
import AuthBtn from "./AuthBtn";
import { FaEnvelope, FaGithub, FaLinkedin, FaUser } from "react-icons/fa6";
import { ModeToggle } from "./theme/ModeToggle";

export function Header() {
  return (
    <header className="z-50 sticky top-0 backdrop-blur bg-background h-16">
      <Container>
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <VersionsBtn className="flex sm:hidden" />
            <Navbar />
          </div>
          <div className="flex space-x-2 items-center">
            <ModeToggle />
            <AuthBtn />
            <VersionsBtn className="hidden sm:flex" />
            <NavBtn />
          </div>
        </div>
      </Container>
    </header>
  );
}

export function Logo() {
  return (
    <Link to="/" className="text-lg">
      <span className="font-bold">TAMI</span>
      <span>MERN</span>
    </Link>
  );
}

export const Socials = () => {
  return (
    <div className="flex gap-4 sm:gap-5 items-center justify-center">
      <a title="My Portfolio" href="https://tamiporto.vercel.app">
        <FaUser className="size-5" />
      </a>
      <a title="Github account" href="https://github.com/mkhotamirais">
        <FaGithub className="size-5" />
      </a>
      <a title="Linked account" href="https://www.linkedin.com/in/mkhotami-rais">
        <FaLinkedin className="size-5" />
      </a>
      <a title="Send email" href="mailto:tami01.job@gmail.com">
        <FaEnvelope className="size-5" />
      </a>
    </div>
  );
};
