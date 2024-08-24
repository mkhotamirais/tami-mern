import { useV4 } from "@/hooks/useV4";
import { useEffect } from "react";
import V4ProductList from "./V4ProductList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";

export default function V4Product() {
  const { data, getData, loadData, errData } = useV4();

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
              <V4ProductList key={item._id} item={item} />
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
          <Link to="/v4-mongodb/product-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
