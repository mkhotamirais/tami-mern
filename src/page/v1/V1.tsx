import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function V1() {
  return (
    <>
      <div className="flex flex-col space-y-8 items-center text-center justify-center h-[calc(100vh-8rem)]">
        <div className="leading-relaxed">
          <h1 className="text-3xl font-bold">TAMIMERN V1</h1>
          <p className="text-muted-foreground">
            The first version only manages a single product model with basic items.
          </p>
        </div>
        <Button asChild className="rounded-full" size="lg">
          <Link to="/v1/product">Product</Link>
        </Button>
      </div>
    </>
  );
}
