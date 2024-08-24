import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { useV3 } from "@/hooks/useV3";
import { Link } from "react-router-dom";

export default function V3() {
  const { me } = useV3();

  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title={`TAMIMERN V3 ${me ? "with " + me?.name : ""}`}
        description="The third version of this MERN stack project includes authentication and authorization features. It encompasses five models: User, Product, Category, Tag, and Dictionary, with relationships established between these models."
      />

      <Button asChild className="rounded-full" size="lg">
        <Link to="/v3-mongodb/product">Product</Link>
      </Button>
    </div>
  );
}
