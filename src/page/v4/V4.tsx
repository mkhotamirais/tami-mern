import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";

export default function V4() {
  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title="TAMIMERN V4"
        description="The forth version manages a single product model that have images, but it's only work in local"
      />
      <Button asChild className="rounded-full" size="lg">
        <Link to="/v4-mongodb/product">Product</Link>
      </Button>
    </div>
  );
}
