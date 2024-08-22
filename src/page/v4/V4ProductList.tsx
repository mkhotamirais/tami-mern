import { Button } from "@/components/ui/button";
import { V4Products } from "@/hooks/useV4";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import V4ProductDelDialog from "./V4ProductDelDialog";

export default function V4ProductList({ item }: { item: V4Products }) {
  return (
    <div className="relative group border rounded-lg overflow-hidden">
      <img src={item.imageUrl} alt="image v4" className="h-32 w-full object-cover" />
      <div className="p-3">
        <h3 className="text-xl capitalize mb-2">{item.name}</h3>
        <p className="text-lg font-semibold">Rp{item.price.toLocaleString("id-ID")}</p>
      </div>
      <div className="z-10 scale-0 group-hover:scale-100 origin-right transition absolute flex gap-1 right-0 top-0 p-2">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link to={`/v4/product-update/${item._id}`}>
            <FaPenToSquare className="text-green-500" />
          </Link>
        </Button>
        <V4ProductDelDialog item={item} />
      </div>
    </div>
  );
}
