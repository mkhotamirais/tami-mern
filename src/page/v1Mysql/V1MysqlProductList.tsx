import { Button } from "@/components/ui/button";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import V1MysqlProductDelDialog from "./V1MysqlProductDelDialog";
import { Product } from "@/hooks/useV1Mysql";

export default function V1MysqlProductList({ item }: { item: Product }) {
  return (
    <div className="group relative border p-2 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2">
        <div>{item.name}</div>
        <div>Rp{item.price.toLocaleString("id-ID")}</div>
      </div>
      <div className="scale-0 group-hover:scale-100 origin-right transition absolute flex gap-1 right-0 top-1/2 -translate-y-1/2 p-2">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link to={`/v1-mysql/product-update/${item.id}`}>
            <FaPenToSquare className="text-green-500" />
          </Link>
        </Button>
        <V1MysqlProductDelDialog item={item} />
      </div>
    </div>
  );
}
