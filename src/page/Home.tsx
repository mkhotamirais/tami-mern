import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
        <div className="leading-relaxed">
          <h1 className="text-3xl font-bold">Welcome to TamiMern</h1>
          <p className="text-muted-foreground">
            This MERN (MongoDB, Express, React, Node) website consists of several versions, starting with a very basic
            version that only utilizes fundamental CRUD HTTP requests. Gradually, each subsequent version builds upon
            the previous one by adding features that enhance and expand its functionality.
          </p>
        </div>
        <Button asChild className="rounded-full" size="lg">
          <Link to="/v1">Explore</Link>
        </Button>
      </div>
    </>
  );
}
