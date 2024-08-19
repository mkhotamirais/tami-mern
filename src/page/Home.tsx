import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
        <LandingTitle
          title="Welcome to TamiMern"
          description="This MERN (MongoDB, Express, React, Node) website consists of several versions, starting with a very basic
            version that only utilizes fundamental CRUD HTTP requests. Gradually, each subsequent version builds upon
            the previous one by adding features that enhance and expand its functionality."
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button asChild className="rounded-full" size="lg">
              <Link to="/v1">Explore</Link>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-mono">
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/v1" className="flex justify-center">
                v1
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link to="/v2" className="flex justify-center">
                v2
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
