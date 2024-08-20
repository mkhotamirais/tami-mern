import { Button } from "@/components/ui/button";
import { FaPenToSquare } from "react-icons/fa6";
import { Link } from "react-router-dom";
import V3ProductDelDialog from "./V3ProductDelDialog";
import { V3Products } from "@/hooks/useV3";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function V3ProductList({ item }: { item: V3Products }) {
  return (
    <Card className="group relative flex flex-col shadow-lg border-none">
      <CardHeader>
        <CardTitle className="capitalize">{item.name}</CardTitle>
      </CardHeader>
      <CardContent className="grow">
        <h3 className="font-bold text-xl">Rp{item.price?.toLocaleString("id-ID")}</h3>
        <p className="font-medium text-muted-foreground">{item.category.name}</p>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex gap-1 flex-wrap">
          {item.tag.map((itm) => (
            <Badge key={itm?.name}>{itm?.name}</Badge>
          ))}
        </div>
      </CardFooter>
      <div className="z-10 absolute top-0 p-2 right-0 space-x-1 scale-0 group-hover:scale-100 transition">
        <Button size={"sm"} variant={"outline"} asChild>
          <Link to={`/v3/product-update/${item._id}`}>
            <FaPenToSquare className="text-green-500" />
          </Link>
        </Button>
        <V3ProductDelDialog item={item} />
      </div>
    </Card>
  );
}
