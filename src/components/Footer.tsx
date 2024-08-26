import { projectsMenu } from "@/lib/projectsMenu";
import { Logo, Socials } from "./Header";
import { Container } from "./Wrapper";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="h-auto">
      <Container>
        <div className="flex py-6 flex-col h-full items-center justify-center gap-4 border-t">
          <Logo />
          <div className="flex justify-center flex-wrap">
            {projectsMenu.map((item, i) => (
              <Button key={i} variant={"link"}>
                <Link to={item.href}>{item.title}</Link>
              </Button>
            ))}
          </div>
          <Socials />
        </div>
      </Container>
    </footer>
  );
}
