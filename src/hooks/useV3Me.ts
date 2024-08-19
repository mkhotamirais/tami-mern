import { useEffect } from "react";
import { useV3 } from "./useV3";

export default function useV3Me() {
  const { me, getMe, loadMe, errMe } = useV3();

  useEffect(() => {
    getMe();
  }, [getMe]);

  return { me, loadMe, errMe };
}
