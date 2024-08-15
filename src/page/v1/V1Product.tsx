import { useV1 } from "@/hooks/useV1";
import { useEffect } from "react";
import V1ProductList from "./V1ProductList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function V1Product() {
  const { data, getData } = useV1();

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">Product List</h2>
        <Button size={"sm"} asChild>
          <Link to="/v1/product-create">Add New</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-1">
        {data.map((item) => (
          <V1ProductList key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
