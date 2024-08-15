import { Button } from "@/components/ui/button";
import { V1Products } from "@/hooks/useV1";
import { FaPenToSquare } from "react-icons/fa6";
import V1ProductDelDialog from "./V1ProductDelDialog";
import { Link } from "react-router-dom";

export default function V1ProductList({ item }: { item: V1Products }) {
  return (
    <div className="group relative border p-2 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2">
        <div>{item.name}</div>
        <div>Rp{item.price.toLocaleString("id-ID")}</div>
      </div>
      <div className="scale-0 group-hover:scale-100 origin-right transition absolute flex gap-1 right-0 top-1/2 -translate-y-1/2 p-2">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link to={`/v1/product-update/${item._id}`}>
            <FaPenToSquare className="text-green-500" />
          </Link>
        </Button>
        <V1ProductDelDialog item={item} />
      </div>
    </div>
  );
}
