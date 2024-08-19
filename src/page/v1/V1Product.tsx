import { useV1 } from "@/hooks/useV1";
import { useEffect } from "react";
import V1ProductList from "./V1ProductList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LoaderBounce } from "@/components/Wrapper";

export default function V1Product() {
  const { data, getData, loadData, errData } = useV1();

  useEffect(() => {
    getData();
  }, [getData]);

  let content;
  if (loadData) {
    content = <LoaderBounce />;
  } else if (errData) {
    content = <div>{errData}</div>;
  } else {
    content = (
      <>
        <div className="grid grid-cols-2 border rounded-lg p-2 mb-2 bg-accent text-primary">
          <div className="font-bold">Name</div>
          <div className="font-bold">Price</div>
        </div>
        {data.length > 0 ? (
          <div className="flex flex-col gap-1">
            {data?.map((item) => (
              <V1ProductList key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center italic">Data empty</div>
        )}
      </>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">Product List</h2>
        <Button size={"sm"} asChild>
          <Link to="/v1/product-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
