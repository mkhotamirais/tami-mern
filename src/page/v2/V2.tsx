import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { useV2 } from "@/hooks/useV2";
import { Link } from "react-router-dom";

export default function V2() {
  const { me } = useV2();
  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title={`TAMIMERN V2 ${me ? "With " + me?.name : ""}`}
        description="The second version of this MERN project includes authentication and authorization features. It has two models:
          User and Product. Only admins can view the User model, while the Product model is accessible to everyone."
      />
      <Button asChild className="rounded-full" size="lg">
        <Link to="/v2-mongodb/product">Product</Link>
      </Button>
    </div>
  );
}
