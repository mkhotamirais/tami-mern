import { Err, LoaderBounce } from "@/components/Wrapper";
import { useEffect } from "react";
import V3TagList from "./V3TagList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useV3 } from "@/hooks/useV3";

export default function V3Tag() {
  const { tag, getTag, loadTag, errTag } = useV3();

  useEffect(() => {
    getTag();
  }, [getTag]);

  let content;
  if (loadTag) {
    content = <LoaderBounce />;
  } else if (errTag) {
    content = <Err>{errTag}</Err>;
  } else {
    content = (
      <>
        {tag.length > 0 ? (
          <div className="flex flex-col gap-1">
            {tag?.map((item) => (
              <V3TagList key={item._id} item={item} />
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
        <h2 className="text-lg font-semibold my-3">Tag List</h2>
        <Button size={"sm"} asChild>
          <Link to="/v3/tag-create">Add New</Link>
        </Button>
      </div>

      {content}
    </div>
  );
}
