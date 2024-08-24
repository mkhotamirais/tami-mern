import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useV3 } from "@/hooks/useV3";
import { Err, LoaderBounce } from "@/components/Wrapper";
import V3KamusList from "./V3KamusList";

export default function V3Kamus() {
  const { kamus, getKamus, errKamus, loadKamus } = useV3();

  useEffect(() => {
    getKamus();
  }, [getKamus]);

  let content;
  if (loadKamus) {
    content = <LoaderBounce />;
  } else if (errKamus) {
    content = <Err>{errKamus}</Err>;
  } else {
    content = (
      <>
        {kamus.length > 0 ? (
          <div className="flex flex-col gap-1">
            {kamus?.map((item) => (
              <V3KamusList key={item._id} item={item} />
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
        <h2 className="text-lg font-semibold my-3">Kamus List</h2>
        <Button size={"sm"} asChild>
          <Link to="/v3-mongodb/kamus-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
