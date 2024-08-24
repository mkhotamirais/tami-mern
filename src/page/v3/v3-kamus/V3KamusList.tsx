import { Button } from "@/components/ui/button";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { V3Kamuss } from "@/hooks/useV3";
import V3KamusDelDialog from "./V3KamusDelDialog";

export default function V3KamusList({ item }: { item: V3Kamuss }) {
  return (
    <div className="z-10 group relative border rounded-lg p-3">
      <h2 className="text-lg font-semibold capitalize">{item?.name}</h2>
      <p className="text-sm text-muted-foreground">{item?.description}</p>
      <div className="text-sm mt-2">
        Links:{" "}
        {item?.reference && item?.reference?.length > 0 ? (
          item?.reference?.map((itm, i) => (
            <div key={itm?._id} className="inline">
              <a href={itm?.refLink} className="text-cyan-500 hover:underline">
                {itm?.refName}
              </a>
              {i < (item.reference?.length ?? 0) - 1 ? " - " : null}
            </div>
          ))
        ) : (
          <span>-</span>
        )}
      </div>
      <div className="scale-0 group-hover:scale-100 transition absolute right-0 top-0 p-1 rounded-lg flex gap-1">
        <Button size="sm" className="rounded-full">
          <Link to={`/v3-mongodb/kamus-update/${item._id}`}>
            <FaPenToSquare />
          </Link>
        </Button>
        <V3KamusDelDialog item={item} />
      </div>
    </div>
  );
}
