import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { projectsMenu } from "@/lib/projectsMenu";

export function VersionsBtn({ className }: { className?: string }) {
  const [version, setVersion] = useState("");

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.split("/")[1] == "") {
      setVersion("version");
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
        {projectsMenu.map((item, i) => (
          <DropdownMenuItem key={i} asChild>
            <Link to={item.href} className="flex justify-center">
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
