import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function VersionsBtn({ className }: { className?: string }) {
  const [version, setVersion] = useState("");

  const { pathname } = useLocation();

  const ver = [
    { href: "/", label: "v0" },
    { href: "/v1", label: "v1" },
    { href: "/v2", label: "v2" },
    { href: "/v3", label: "v3" },
  ];

  useEffect(() => {
    if (pathname.split("/")[1] == "") {
      setVersion("v0");
    } else setVersion(pathname.split("/")[1]);
  }, [pathname]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={`${className}`}>
        <Badge variant={"secondary"} className="font-mono flex">
          {version}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-fit font-mono">
        {ver.map((item, i) => (
          <DropdownMenuItem key={i} asChild>
            <Link to={item.href}>{item.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
