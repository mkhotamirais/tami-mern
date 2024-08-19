import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";

export default function V2() {
  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title="TAMIMERN V2"
        description="The second version of this MERN project includes authentication and authorization features. It has two models:
          User and Product. Only admins can view the User model, while the Product model is accessible to everyone."
      />
      <div className="flex flex-col sm:flex-row gap-1">
        <Button asChild className="rounded-full" size="lg">
          <Link to="/v2/user">User</Link>
        </Button>
        <Button asChild className="rounded-full" size="lg">
          <Link to="/v2/product">Product</Link>
        </Button>
      </div>
    </div>
  );
}
