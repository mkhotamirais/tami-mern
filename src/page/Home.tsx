import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";
import { Projects } from "./Projects";

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-10 items-center text-center justify-center min-h-[calc(100vh-4rem)]">
        <LandingTitle
          title="Welcome to TamiMern"
          description="This Todo and MERN (MongoDB/Mysql, Express, React, Node) website consists of several versions, starting with a very basic
            version that only utilizes fundamental CRUD HTTP requests. Gradually, each subsequent version builds upon
            the previous one by adding features that enhance and expand its functionality."
        />

        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="rounded-full w-32" size="lg" asChild>
            <Link to="#crud-versions">Explore</Link>
          </Button>
          <Button asChild size={"lg"} variant={"outline"} className="rounded-full w-32">
            <Link to="doc">Doc</Link>
          </Button>
        </div>
        <div></div>
      </div>
      <Projects />
    </>
  );
}
