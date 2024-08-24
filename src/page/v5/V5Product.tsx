import { useV5 } from "@/hooks/useV5";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import V5ProductList from "./V5ProductList";

export default function V5Product() {
  const { data, getData, loadData, errData } = useV5();

  useEffect(() => {
    getData();
  }, [getData]);

  let content;
  if (loadData) {
    content = <LoaderBounce />;
  } else if (errData) {
    content = <Err>{errData}</Err>;
  } else {
    content = (
      <>
        {data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
            {data?.map((item) => (
              <V5ProductList key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center italic">Data empty</div>
        )}
      </>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">Product List</h2>
        <Button size={"sm"} asChild>
          <Link to="/v5-mongodb/product-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
