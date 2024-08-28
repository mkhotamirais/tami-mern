import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Err, LoaderBounce } from "@/components/Wrapper";
import { useV2Sequelize } from "@/hooks/useV2Sequelize";
import V2SequelizeProductList from "./V2SequelizeProductList";

export default function V2SequelizeProduct() {
  const { data, getData, loadData, errData } = useV2Sequelize();

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
        <div className="grid grid-cols-2 border rounded-lg p-2 mb-2 bg-accent text-primary">
          <div className="font-bold">Name</div>
          <div className="font-bold">Price</div>
        </div>
        {data.length > 0 ? (
          <div className="flex flex-col gap-1">
            {data?.map((item) => (
              <V2SequelizeProductList key={item.id} item={item} />
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
          <Link to="/v2-sequelize/product-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
