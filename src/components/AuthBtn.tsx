import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, User } from "lucide-react";
import useV2Me from "@/hooks/useV2Me";
import axios from "axios";
import { url } from "@/lib/constants";
import { toast } from "sonner";
import useV3Me from "@/hooks/useV3Me";

export default function AuthBtn() {
  const { pathname } = useLocation();

  const path1 = pathname.split("/")[1];

  let content: React.ReactNode | null;
  if (path1 === "v2") {
    content = <AuthV2Btn />;
  } else if (path1 === "v3") {
    content = <AuthV3Btn />;
  } else {
    content = null;
  }

  return content;
}

function AuthV2Btn() {
  const { me } = useV2Me();

  const onLogout = async () => {
    await axios
      .create({ withCredentials: true })
      .patch(`${url}/v2/signout`)
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = "/v2/login";
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      });
  };

  let content;
  if (me) {
    content = (
      <>
        <DropdownMenuItem asChild>
          <Link to="/v2/me">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </>
    );
  } else {
    content = (
      <>
        <DropdownMenuItem asChild>
          <Link to="/v2/login">Login</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/v2/register">Register</Link>
        </DropdownMenuItem>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="" size={"sm"} variant={"link"}>
          {me ? <User className="size-4" /> : <LogIn className="w-4 h-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{content}</DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthV3Btn() {
  const { me } = useV3Me();

  const onLogout = async () => {
    await axios
      .create({ withCredentials: true })
      .patch(`${url}/v3/signout`)
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = "/v3/login";
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      });
  };

  let content;
  if (me) {
    content = (
      <>
        <DropdownMenuItem asChild>
          <Link to="/v3/me">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onLogout}>Logout</DropdownMenuItem>
      </>
    );
  } else {
    content = (
      <>
        <DropdownMenuItem asChild>
          <Link to="/v3/login">Login</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/v3/register">Register</Link>
        </DropdownMenuItem>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="" size={"sm"} variant={"link"}>
          {me ? <User className="size-4" /> : <LogIn className="w-4 h-4" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">{content}</DropdownMenuContent>
    </DropdownMenu>
  );
}
