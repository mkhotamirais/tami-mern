import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useV1Text } from "./useV1Text";
import V1TextList from "./V1TextList";

export default function V1Text() {
  const { data, loadPage, errPage, setData } = useV1Text();
  useEffect(() => {
    setData();
  }, [setData]);

  if (loadPage) return <div>Loading...</div>;
  if (errPage) return <div>{errPage}</div>;

  return (
    <div>
      <div>v1</div>
      <Button asChild>
        <Link to="/v1-text/create">Add Text</Link>
      </Button>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {data && data?.map((item) => <V1TextList key={item._id} item={item} />)}
      </div>
    </div>
  );
}
