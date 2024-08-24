import { Err, LoaderBounce } from "@/components/Wrapper";
import { useEffect } from "react";
import V3CategoryList from "./V3CategoryList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useV3 } from "@/hooks/useV3";

export default function V3Category() {
  const { cat, getCat, loadCat, errCat } = useV3();

  useEffect(() => {
    getCat();
  }, [getCat]);

  let content;
  if (loadCat) {
    content = <LoaderBounce />;
  } else if (errCat) {
    content = <Err>{errCat}</Err>;
  } else {
    content = (
      <>
        {cat.length > 0 ? (
          <div className="flex flex-col gap-1">
            {cat?.map((item) => (
              <V3CategoryList key={item._id} item={item} />
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
        <h2 className="text-lg font-semibold my-3">Category List</h2>
        <Button size={"sm"} asChild>
          <Link to="/v3-mongodb/category-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
