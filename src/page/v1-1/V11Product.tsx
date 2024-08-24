import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import V11ProductList from "./V11ProductList";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "@/redux/features/v11ProductSlice";
import { AppDispatch, RootV11Product } from "@/redux/store";

export default function V11Product() {
  const { data, status, error } = useSelector((state: RootV11Product) => state.v11Product);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  let content;
  if (status === "loading") {
    content = <LoaderBounce />;
  } else if (status === "failed") {
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
            {data?.map((item) => (
              <V11ProductList key={item._id} item={item} />
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
          <Link to="/v1-1-mongodb/product-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
