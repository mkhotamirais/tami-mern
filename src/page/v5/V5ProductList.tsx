import { Button } from "@/components/ui/button";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { V5Products } from "@/hooks/useV5";
import V5ProductDelDialog from "./V5ProductDelDialog";

export default function V5ProductList({ item }: { item: V5Products }) {
  return (
    <div className="relative group border rounded-lg overflow-hidden">
      <img src={item.image} alt={item.name || "image v5"} className="h-32 w-full object-cover" />
      <div className="p-3">
        <h3 className="text-xl capitalize mb-2">{item.name}</h3>
      </div>
      <div className="z-10 scale-0 group-hover:scale-100 origin-right transition absolute flex gap-1 right-0 top-0 p-2">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link to={`/v5-mongodb/product-update/${item._id}`}>
            <FaPenToSquare className="text-green-500" />
          </Link>
        </Button>
        <V5ProductDelDialog item={item} />
      </div>
    </div>
  );
}
