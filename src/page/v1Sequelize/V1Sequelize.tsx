import { Button } from "@/components/ui/button";
import { LandingTitle } from "@/components/Wrapper";
import { Link } from "react-router-dom";

export default function V1Sequelize() {
  return (
    <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
      <LandingTitle
        title="TAMIMERN V1 Sequelize"
        description="This version uses a REST API with MySQL, utilizing the mysql2 library, with a single product model."
      />
      <Button asChild className="rounded-full" size="lg">
        <Link to="/v1-sequelize/product">Product</Link>
      </Button>
    </div>
  );
}
