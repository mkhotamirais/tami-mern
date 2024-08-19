import { useEffect } from "react";
import { useV2 } from "./useV2";

export default function useV2Me() {
  const { me, getMe, loadMe, errMe } = useV2();

  useEffect(() => {
    getMe();
  }, [getMe]);

  return { me, loadMe, errMe };
}
