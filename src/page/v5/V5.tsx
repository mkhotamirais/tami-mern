import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";

export default function V5() {
  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title="TAMIMERN V5"
        description="The fifth version manages a single product model that have images that saved in cloudinary"
      />
      <Button asChild className="rounded-full" size="lg">
        <Link to="/v5/product">Product</Link>
      </Button>
    </div>
  );
}
