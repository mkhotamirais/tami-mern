import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { projectsMenu } from "@/lib/projectsMenu";
import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";

const badges = [...new Set(projectsMenu.flatMap((project) => project.tools))];

export function Projects({ className }: { className?: string }) {
  const [cari, setCari] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<string[]>([]);

  const filteredProjectsMenu = projectsMenu
    .filter((item) => item.title.toLowerCase().includes(cari.toLowerCase()))
    .filter((item) => selectedBadge.every((badge) => item.tools.includes(badge)));

  const onBadge = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const badge: string = target?.innerText;
    if (selectedBadge.includes(badge)) {
      setSelectedBadge((prev) => prev.filter((p) => p !== badge));
    } else {
      setSelectedBadge((prev) => [...prev, badge]);
    }
  };

  return (
    <div id="crud-versions" className={`${className} scroll-mt-16`}>
      <h2 className="text-3xl font-bold text-center mb-4">MERN VERSIONS</h2>
      <Input
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Search project.."
        className="bg-cyan-100/15 mb-2"
      />
      <div className="flex gap-1 flex-wrap my-4 justify-center">
        {badges.sort().map((item, i) => (
          <Badge
            variant={selectedBadge.includes(item) ? "secondary" : "default"}
            key={i}
            className="cursor-pointer"
            onClick={onBadge}
          >
            {item}
          </Badge>
        ))}
      </div>
      <div className="pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {filteredProjectsMenu.map((item, i) => (
          <Card key={i} className="group relative flex flex-col overflow-hidden text-center">
            <div className="translate-y-full group-hover:translate-y-0 transition absolute inset-0 top-3/4 z-10 flex items-center justify-center">
              <Button asChild className="rounded-full px-8 backdrop-blur bg-black/15">
                <Link to={item.href}>View</Link>
              </Button>
            </div>
            <CardHeader className="p-2">
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="px-2 grow">
              <CardDescription>{item.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-2 flex gap-1 flex-wrap justify-center">
              {item.tools.map((itm) => (
                <Badge variant="default" key={itm}>
                  {itm}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>
      {filteredProjectsMenu.length === 0 && (
        <div className="flex justify-center items-center flex-col gap-2 italic text-xl">
          <div>No Result</div>
          <Button
            onClick={() => {
              setCari("");
              setSelectedBadge([]);
            }}
            type="button"
            variant={"secondary"}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
}
