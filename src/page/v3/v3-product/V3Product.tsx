import { Err, LoaderBounce } from "@/components/Wrapper";
import { useEffect } from "react";
import V3ProductList from "./V3ProductList";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { useV3 } from "@/hooks/useV3";
import { QueryFilterCat, QueryReset, QuerySearch, QuerySort } from "./V3ProductQuery";

export default function V3Product() {
  const { data, getData, loadData, errData } = useV3();
  const [searchParams] = useSearchParams();
  // membuat params jadi object
  // const objectParams = Object.fromEntries(searchParams.entries());

  useEffect(() => {
    getData(searchParams.toString());
  }, [getData, searchParams]);

  let content;
  if (loadData) {
    content = <LoaderBounce />;
  } else if (errData) {
    content = <Err>{errData}</Err>;
  } else {
    content = (
      <>
        {data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {data?.map((item) => (
              <V3ProductList key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center italic mt-8">Data empty</div>
        )}
      </>
    );
  }

  return (
    <div className="mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">Product List</h2>
        <div className="flex gap-1">
          <QueryReset />
          <Button size={"sm"} asChild>
            <Link to="/v3/product-create">Add New</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 my-2">
        <div className="grid grid-cols-3 gap-2">
          <QuerySearch className="col-span-2" />
          <QueryFilterCat className="col-span-1 w-full" />
        </div>
        <div className="grid grid-cols-4 gap-2">
          <QuerySort />
        </div>
        {/* <div className="my-2 flex gap-1 flex-wrap">
          <QueryTag />
        </div> */}
      </div>

      {content}
    </div>
  );
}
