import { Link } from "react-router-dom";
import { Container } from "./Wrapper";
import { VersionsBtn } from "./VersionsBtn";
import Navbar, { NavBtn } from "./Navbar";

export function Header() {
  return (
    <header className="z-50 sticky top-0 backdrop-blur bg-white/70 h-16">
      <Container>
        <div className="h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <VersionsBtn className="block sm:hidden" />
            <Navbar />
          </div>
          <NavBtn />
          <VersionsBtn className="hidden sm:block" />
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
