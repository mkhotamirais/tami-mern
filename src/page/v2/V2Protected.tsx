import { Err, LoaderBounce } from "@/components/Wrapper";
import useV2Me from "@/hooks/useV2Me";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function V2Protected() {
  const { loadMe, errMe } = useV2Me();

  if (loadMe) return <LoaderBounce />;
  if (errMe) return <Err>{errMe}</Err>;

  return <Outlet />;
}

export function V2IsLogin() {
  const { me } = useV2Me();
  const navigate = useNavigate();

  useEffect(() => {
    if (me) {
      navigate("/v2-mongodb");
    }
  }, [me, navigate]);

  return <Outlet />;
}
