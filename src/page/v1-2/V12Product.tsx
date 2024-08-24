import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import { InitialData, useGetProductsQuery } from "@/redux/api/v12ProductApiSlice";
import V12ProductList from "./V12ProductList";

export default function V12Product() {
  const { data, isLoading, isError, error } = useGetProductsQuery(null);

  let content;
  if (isLoading) {
    content = <LoaderBounce />;
  } else if (isError) {
    content = <Err>{error as string}</Err>;
  } else {
    content = (
      <>
        <div className="grid grid-cols-2 border rounded-lg p-2 mb-2 bg-accent text-primary">
          <div className="font-bold">Name</div>
          <div className="font-bold">Price</div>
        </div>
        {data?.length > 0 ? (
          <div className="flex flex-col gap-1">
            {data?.map((item: InitialData) => (
              <V12ProductList key={item._id} item={item} />
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
          <Link to="/v1-2-mongodb/product-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
