import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";

export default function V2Sequelize() {
  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title="TAMIMERN V2 Sequelize"
        description="This version uses a REST API with MySQL, utilizing the sequelize orm library, with authentication and authorization"
      />
      <Button asChild className="rounded-full" size="lg">
        <Link to="/v2-sequelize/product">Product</Link>
      </Button>
    </div>
  );
}
