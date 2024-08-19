import { Err, LoaderBounce } from "@/components/Wrapper";
import { useV2 } from "@/hooks/useV2";
import { useEffect } from "react";
import V2UserList from "./V2UserList";

export default function V2User() {
  const { users, getUsers, loadUsers, errUsers } = useV2();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  let content;
  if (loadUsers) {
    content = <LoaderBounce />;
  } else if (errUsers) {
    content = <Err>{errUsers}</Err>;
  } else {
    content = (
      <div className="flex flex-col gap-1">
        {users.map((item) => (
          <V2UserList key={item._id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold my-3">User List</h2>
      </div>

      {content}
    </div>
  );
}
