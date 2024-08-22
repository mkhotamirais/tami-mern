import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";

export default function V0() {
  const todoList = [
    { href: "/v0/todo1", label: "todo1" },
    { href: "/v0/todo3", label: "todo2" },
    { href: "/v0/todo3", label: "todo3" },
    { href: "/v0/todo4", label: "todo4" },
  ];

  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title="TAMITODOS"
        description={`This project involves implementing four todo apps, each with identical functionality but utilizing different tools for their respective implementations. All the apps are designed with a consistent user interface, leveraging ShadCN UI for a cohesive and polished appearance.`}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" size="lg">
            Todos
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-mono">
          {todoList.map((item, i) => (
            <DropdownMenuItem key={i} className="cursor-pointer" asChild>
              <Link to={item.href} className="flex justify-center">
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
