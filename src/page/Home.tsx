import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LandingTitle } from "@/components/Wrapper";
import { versionMongodb } from "@/lib/constants";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-10 items-center text-center justify-center h-[calc(100vh-8rem)]">
        <LandingTitle
          title="Welcome to TamiMern"
          description="This Todo and MERN (MongoDB/Mysql, Express, React, Node) website consists of several versions, starting with a very basic
            version that only utilizes fundamental CRUD HTTP requests. Gradually, each subsequent version builds upon
            the previous one by adding features that enhance and expand its functionality."
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full" size="lg">
              Explore
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-mono">
            {versionMongodb.map((item, i) => (
              <DropdownMenuItem key={i} className="cursor-pointer py-1" asChild>
                <Link to={item.href} className="flex justify-center">
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
