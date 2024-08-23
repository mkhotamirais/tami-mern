import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useBasic } from "@/hooks/useBasic";

const navVer0 = [
  { href: "/v0", label: "v0 home" },
  { href: "/v0/todo1", label: "todo1" },
  { href: "/v0/todo2", label: "todo2" },
  { href: "/v0/todo3", label: "todo3" },
  { href: "/v0/todo4", label: "todo4" },
];

const navVer1 = [
  { href: "/v1", label: "v1 home" },
  { href: "/v1/product", label: "product" },
];

const navVer11 = [
  { href: "/v1-1", label: "v1-1 home" },
  { href: "/v1-1/product", label: "product" },
];

const navVer2 = [
  { href: "/v2", label: "v2 home" },
  { href: "/v2/product", label: "product" },
  { href: "/v2/user", label: "user" },
];

const navVer3 = [
  { href: "/v3", label: "v3 home" },
  { href: "/v3/product", label: "product" },
  { href: "/v3/category", label: "category" },
  { href: "/v3/tag", label: "tag" },
  { href: "/v3/kamus", label: "kamus" },
  { href: "/v3/user", label: "user" },
];

const navVer4 = [
  { href: "/v4", label: "v4 home" },
  { href: "/v4/product", label: "product" },
];

const navVer5 = [
  { href: "/v5", label: "v5 home" },
  { href: "/v5/product", label: "product" },
];

export default function Navbar({ className }: { className?: string }) {
  const [nav, setNav] = useState<{ href: string; label: string }[]>([]);
  const { pathname } = useLocation();
  const { nav: navBtn, closeNav } = useBasic();

  const path1: string = pathname.split("/")[1];
  let path2: string = pathname.split("/")[2];
  if (!path2 && path1 === "v0") path2 = "v0 home";
  if (!path2 && path1 === "v1") path2 = "v1 home";
  if (!path2 && path1 === "v1-1") path2 = "v1-1 home";
  if (!path2 && path1 === "v2") path2 = "v2 home";
  if (!path2 && path1 === "v3") path2 = "v3 home";
  if (!path2 && path1 === "v4") path2 = "v4 home";
  if (!path2 && path1 === "v5") path2 = "v5 home";

  const onNavClick = () => {
    if (nav) {
      closeNav();
    }
  };

  useEffect(() => {
    if (path1 == "v0") {
      setNav(navVer0);
    } else if (path1 == "v1") {
      setNav(navVer1);
    } else if (path1 == "v1-1") {
      setNav(navVer11);
    } else if (path1 == "v2") {
      setNav(navVer2);
    } else if (path1 == "v3") {
      setNav(navVer3);
    } else if (path1 == "v4") {
      setNav(navVer4);
    } else if (path1 == "v5") {
      setNav(navVer5);
    } else setNav([]);
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
              path2?.toLowerCase().includes(item.label?.toLowerCase())
                ? "text-gray-900 font-[500]"
                : "text-muted-foreground"
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
  const { pathname } = useLocation();
  const path1 = pathname.split("/")[1];
  const onClick = () => {
    if (nav) {
      closeNav();
    } else openNav();
  };

  if (!path1) return null;

  return (
    <Button onClick={onClick} size={"icon"} variant={"ghost"} className="static sm:hidden">
      <div className={`${nav ? "rotate-180" : ""} transition`}>
        {nav ? <FaXmark className="size-5" /> : <FaBars className="size-5" />}
      </div>
    </Button>
  );
};
