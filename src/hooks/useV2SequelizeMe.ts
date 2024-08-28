import { useEffect } from "react";
import { useV2Sequelize } from "./useV2Sequelize";

export default function useV2SequelizeMe() {
  const { refresh, accessToken, me, getMe, loadMe, errMe } = useV2Sequelize();

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (accessToken) {
      getMe(accessToken);
    }
  }, [accessToken, getMe]);

  return { me, accessToken, loadMe, errMe };
}
