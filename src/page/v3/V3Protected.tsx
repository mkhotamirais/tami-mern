import { Err, LoaderBounce } from "@/components/Wrapper";
import useV3Me from "@/hooks/useV3Me";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function V3Protected() {
  const { loadMe, errMe } = useV3Me();

  if (loadMe) return <LoaderBounce />;
  if (errMe) return <Err>{errMe}</Err>;

  return <Outlet />;
}

export function V3IsLogin() {
  const { me } = useV3Me();
  const navigate = useNavigate();

  useEffect(() => {
    if (me) {
      navigate("/v3");
    }
  }, [me, navigate]);

  return <Outlet />;
}
