import { Logo } from "./Header";
import { Container } from "./Wrapper";
import { SiVite, SiNextdotjs, SiGithub, SiLinkedin } from "react-icons/si";
import { FaUser } from "react-icons/fa6";

export default function Footer() {
  const footerLink = [
    { href: "https://tamiweb.vercel.app/portfolio", icon: <FaUser />, title: "my portfolio" },
    { href: "https://tamivite.vercel.app", icon: <SiVite />, title: "vite projects collection" },
    { href: "https://tamiweb.vercel.app", icon: <SiNextdotjs />, title: "next projects collection" },
    { href: "https://github.com/mkhotamirais", icon: <SiGithub />, title: "github account" },
    { href: "https://www.linkedin.com/in/mkhotami-rais/", icon: <SiLinkedin />, title: "linkedin account" },
  ];
  return (
    <footer className="h-16">
      <Container>
        <div className="flex h-full items-center justify-between gap-2">
          <Logo />
          <div className="flex gap-3 sm:gap-4">
            {footerLink.map((item, i) => (
              <a
                key={i}
                title={item.title}
                rel="noopener noreferrer"
                href={item.href}
                className="inline-block hover:scale-125 transition"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
