import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useBasic } from "@/hooks/useBasic";

const navVer1 = [
  { href: "/v1", label: "v1 home" },
  { href: "/v1/product", label: "product" },
];

const navVer2 = [
  { href: "/v2", label: "v2 home" },
  { href: "/v2/product", label: "product" },
  { href: "/v2/user", label: "user" },
];

export default function Navbar({ className }: { className?: string }) {
  const [nav, setNav] = useState<{ href: string; label: string }[]>([]);
  const { pathname } = useLocation();
  const { nav: navBtn, closeNav } = useBasic();

  const path1: string = pathname.split("/")[1];
  let path2: string = pathname.split("/")[2];
  if (!path2) path2 = "v1 home";

  const onNavClick = () => {
    if (nav) {
      closeNav();
    }
  };

  useEffect(() => {
    if (path1 == "v1") {
      setNav(navVer1);
    } else if (path1 == "v2") {
      setNav(navVer2);
    }
  }, [path1]);

  return (
    <nav
      className={`${className} ml-0 sm:ml-6 ${
        navBtn ? "scale-y-100" : "scale-y-0"
      } sm:scale-y-100 origin-top transition text-[0.9rem] fixed sm:static top-16 bg-white inset-x-0 p-3 sm:p-0 border-b rounded-b sm:border-none`}
    >
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        {nav.map((item, i) => (
          <Link
            onClick={onNavClick}
            key={i}
            to={item.href}
            className={`${
              path2 === item.label ? "text-gray-900" : "text-muted-foreground"
            } capitalize hover:text-gray-800 p-2 sm:p-0 hover:bg-muted sm:hover:bg-inherit rounded transition`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export const NavBtn = () => {
  const { nav, openNav, closeNav } = useBasic();
  const onClick = () => {
    if (nav) {
      closeNav();
    } else openNav();
  };

  return (
    <Button onClick={onClick} size={"icon"} variant={"ghost"} className="static sm:hidden">
      <div className={`${nav ? "rotate-180" : ""} transition`}>
        {nav ? <FaXmark className="size-5" /> : <FaBars className="size-5" />}
      </div>
    </Button>
  );
};
