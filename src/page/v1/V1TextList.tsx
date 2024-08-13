import { Button } from "@/components/ui/button";
import { V1TextValues } from "./useV1Text";
import { FaPenToSquare } from "react-icons/fa6";
import V1TextDelDialog from "./V1TextDelDialog";
import { Link } from "react-router-dom";

export default function V1TextList({ item }: { item: V1TextValues }) {
  return (
    <div className="group relative border rounded-xl p-4">
      <div>{item.name}</div>
      <div>{item.description}</div>
      <div className="hidden group-hover:flex absolute gap-2 items-center justify-center inset-0">
        <Button asChild>
          <Link to={`/v1-text/update/${item._id}`}>
            <FaPenToSquare />
          </Link>
        </Button>
        <V1TextDelDialog id={item?._id} />
      </div>
    </div>
  );
}
