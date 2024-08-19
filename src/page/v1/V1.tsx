import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";

export default function V1() {
  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title="TAMIMERN V1"
        description="The first version only manages a single product model with basic items."
      />
      <Button asChild className="rounded-full" size="lg">
        <Link to="/v1/product">Product</Link>
      </Button>
    </div>
  );
}
