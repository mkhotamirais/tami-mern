import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      Home
      <Button asChild>
        <Link to="/v1-text">V1 Text</Link>
      </Button>
    </div>
  );
}
