import { Err, LoaderBounce } from "@/components/Wrapper";
import useV2SequelizeMe from "@/hooks/useV2SequelizeMe";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export function V2SequelizeProtected() {
  const { loadMe, errMe } = useV2SequelizeMe();

  if (loadMe) return <LoaderBounce />;
  if (errMe) return <Err>{errMe}</Err>;

  return <Outlet />;
}

export function V2SequelizeIsLogin() {
  const { me } = useV2SequelizeMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (me) {
      navigate("/v2-sequelize");
    }
  }, [me, navigate]);

  return <Outlet />;
}
